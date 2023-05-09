const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

function getBuffer(crxPathOrBuffer) {
  return typeof crxPathOrBuffer === "string"
    ? fs.readFileSync(crxPathOrBuffer)
    : crxPathOrBuffer;
}

/**
 * Checks whether the given path or Buffer contains a valid CRX file.
 * @param {String | Buffer} crxPathOrBuffer
 * @return
 * @public
 */
function isCrx(crxPathOrBuffer) {
  const buffer = getBuffer(crxPathOrBuffer);
  const magic = buffer.readUInt32BE(0);
  return magic === 0x43723234; // Cr24
}

/**
 * Get CRX file version.
 * @param {String | Buffer} crxPathOrBuffer
 * @return The version number (2 or 3)
 * @public
 */
function getCrxVersion(crxPathOrBuffer) {
  const buffer = getBuffer(crxPathOrBuffer);
  return buffer.readUInt32LE(4);
}

/**
 * Return a Buffer slice representing contents of the Zip file.
 * @param {String | Buffer} crxPathOrBuffer
 * @return {Buffer} Zip buffer
 * @public
 */
function getZipContents(crxPathOrBuffer) {
  const buffer = getBuffer(crxPathOrBuffer);

  if (isCrx(buffer)) console.log("  Magic is OK");
  else throw new Error("Not a CRX format");

  const version = getCrxVersion(buffer);
  console.log(`  CRX version: ${version}`);

  if (version <= 2) {
    const publicKeyLength = buffer.readUInt32LE(8);
    const signatureLength = buffer.readUInt32LE(12);
    return buffer.slice(16 + publicKeyLength + signatureLength);
  } else {
    const headerLength = buffer.readUInt32LE(8);
    return buffer.slice(12 + headerLength);
  }
}

/**
 * Extract a CRX file
 * @param {String | Buffer} crxPathOrBuffer
 * @param {String} output Default by `process.cwd()`
 * @public
 */
function extract(crxPathOrBuffer, output = process.cwd()) {
  var contents = getZipContents(crxPathOrBuffer);
  var zip = new AdmZip(contents);
  zip.extractAllTo(path.resolve(output));
}

module.exports = { isCrx, getCrxVersion, getZipContents, extract };
