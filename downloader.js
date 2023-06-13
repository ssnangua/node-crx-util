const { Buffer } = require("node:buffer");

const URL_PATTERN = {
  chrome:
    "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx3&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc",
  edge: "https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc",
};

/**
 * Get download url
 *
 * @param {String} url
 *
 * @return The download url
 *
 * @public
 */
function getDownloadURL(extensionId, source) {
  return URL_PATTERN[source].replace("[EXTENSION_ID]", extensionId);
}

function getExtensionId(url) {
  return new URL(url).pathname.split("/").pop();
}

/**
 * Parse Chrome/Edge extension url
 * @param {String} url Chrome/Edge extension url
 * @return An Object contains `extensionId` and `source`
 * @public
 */
function parseURL(url) {
  let extensionId, source;
  if (url.startsWith("https://chrome.google.com/")) {
    extensionId = getExtensionId(url);
    source = "chrome";
  } else if (url.startsWith("https://microsoftedge.microsoft.com/")) {
    extensionId = getExtensionId(url);
    source = "edge";
  }
  return { extensionId, source };
}

/**
 * Download a CRX file by url
 * @param {String} url Chrome/Edge extension url
 * @return Resolves with CRX buffer
 * @public
 */
function downloadByURL(url) {
  const { extensionId, source } = parseURL(url);
  return downloadById(extensionId, source);
}

/**
 * Download a CRX file by extension id and source
 * @param {String} extensionId
 * @param {"chrome" | "edge"} source "chrome" or "edge"
 * @return Resolves with CRX buffer
 * @public
 */
async function downloadById(extensionId, source) {
  const url = getDownloadURL(extensionId, source);
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error('unable to download the CRX file.');
  }
  return Buffer.from(await response.arrayBuffer());
}

module.exports = {
  URL_PATTERN,
  parseURL,
  getDownloadURL,
  downloadByURL,
  downloadById,
};
