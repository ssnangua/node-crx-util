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
  const downloadURL = downloader.getDownloadURL(extensionId, source);
  const saveAsCRX = /\.crx$/i.test(output);
  output = saveAsCRX ? path.resolve(output) : path.resolve(output, extensionId);
  console.log("[CRX Util]");
  console.log("  id: " + extensionId);
  console.log("  from: " + downloadURL);
  console.log("  to: " + output);
  console.log("  downloading...");
  return downloader
    .downloadById(extensionId, source)
    .then((buffer) => {
      if (saveAsCRX) {
        console.log("  saving...");
        fs.writeFileSync(output, buffer);
        console.log("  done!");
      } else {
        console.log("  extracting...");
        try {
          parser.extract(buffer, output);
          console.log("  done!");
        } catch (err) {
          console.error("  extract failed");
          console.error(err);
          return Promise.reject(err || "extract failed")
        }
      }
      return { result: true, extensionId, source, downloadURL, output };
    })
    .catch((error) => {
      console.error("  " + error);
      return { result: false, error, extensionId, source, downloadURL, output };
    });
}

module.exports = { downloader, parser, downloadByURL, downloadById };
