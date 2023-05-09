const path = require("path");
const fs = require("fs");
const downloader = require("./downloader.js");
const parser = require("./parser.js");

/**
 * Download a CRX file by url
 * @param {String} url Chrome/Edge extension url
 * @param {String} output If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.
 * @return
 * @public
 */
function downloadByURL(url, output = process.cwd()) {
  const { extensionId, source } = downloader.parseURL(url);
  return downloadById(extensionId, source, output);
}

/**
 * Download a CRX file by extension id and source
 * @param {String} extensionId
 * @param {"chrome" | "edge"} source "chrome" or "edge"
 * @param {String} output If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.
 * @return Resolves with CRX buffer
 * @public
 */
function downloadById(extensionId, source, output = process.cwd()) {
  console.log("[CRX Util]");
  console.log("  id: " + extensionId);
  console.log("  from: " + downloader.getDownloadURL(extensionId, source));
  console.log("  to: " + output);
  console.log("  downloading...");
  return downloader
    .downloadById(extensionId, source)
    .then((buffer) => {
      if (/\.crx$/i.test(output)) {
        console.log("  saving...");
        fs.writeFileSync(output, buffer);
        console.log("  done!");
      } else {
        console.log("  extracting...");
        try {
          parser.extract(buffer, path.resolve(output, extensionId));
          console.log("  done!");
        } catch (err) {
          console.error("  extract failed");
          console.error(err);
        }
      }
    })
    .catch((error) => {
      console.error("  unable to download the CRX file.");
      console.error(error);
    });
}

module.exports = { downloader, parser, downloadByURL, downloadById };
