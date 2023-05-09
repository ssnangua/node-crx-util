# crx-util

Download (and extract) Chrome/Edge extension (.crx).

## Install

```bash
npm install crx-util
```

## Usage

```javascript
const crx = require("crx-util");

// Download a CRX file from microsoft webstore
crx.downloadByURL(`https://microsoftedge.microsoft.com/addons/detail/${extensionName}/${extensionId}`, "./xxx.crx");

// Download by extension id and source
crx.downloadById(`${extensionId}`, "edge", "./xxx.crx");

// Download and extract
crx.downloadById(`${extensionId}`, "edge", "./xxx");

// Download from google webstore
crx.downloadByURL(`https://chrome.google.com/webstore/detail/${extensionName}/${extensionId}`, "./xxx.crx");

// Or by extension id and source
crx.downloadById(`${extensionId}`, "chrome", "./xxx.crx");

// Extract a local CRX file
crx.parser.extract("./xxx.crx", "./xxx")
```

## CLI

### Usage

```bash
# Download by webstore url
crx-util -u=url [-o=destination]

# Download by extension id and source
crx-util -i=extensionId -s=source [-o=destination]

# Extract a local CRX file
Usage: crx-util -e=crxPath [-o=destination]
```

### Example:

```bash
# Download a CRX file from microsoft webstore
crx-util -u="https://microsoftedge.microsoft.com/addons/detail/$name/$id" -o="./xxx.crx"

# Download and extract
crx-util -i="$id" -s="edge" -o="./xxx"

# Extract a local CRX file
crx-util -e="./xxx.crx" -o="./xxx"
```

### Arguments

- `-u`, `--url`     - Chrome/Edge extension url
- `-i`, `--id`      - Extension id
- `-s`, `--source`  - Extension source, `"chrome"` or `"edge"`
- `-e`, `--extract` - Extract a local CRX file
- `-o`, `--output`  - Destination, if it ends with `.crx`, it will be saved as a CRX file, otherwise it will be extracted to `${destination}/${extensionId}`. Default by `process.cwd()`.
- `-h`, `--help`    - Display help for command

## API

### crx.downloadByURL(url, output?): Promise

Download a CRX file from webstore.

- `url` string - Chrome/Edge extension url
- `output` string (optional) - If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.

### crx.downloadById(extensionId, source, output?): Promise

Download a CRX file by extension id and source.

- `extensionId` string - Extension id
- `source` "chrome" | "edge" - Extension source
- `output` string (optional) - If `output` ends with ".crx", it will be saved as a CRX file, otherwise it will be extracted to `${output}/${extensionId}`. Default by `process.cwd()`.

### crx.downloader

#### crx.downloader.URL_PATTERN

Download url pattern.

- `chrome` string
- `edge` string

#### crx.downloader.parseURL(url): Object

Extract a local CRX file.

- `url` string - Chrome/Edge extension url.

Returns an object contains `extensionId` and `source` (`"chrome"` or `"edge"`) info.

#### crx.downloader.getDownloadURL(extensionId, source): String

Get download url by extensionId and source.

- `extensionId` string - Extension id
- `source` "chrome" | "edge" - Extension source

Returns the download url.

#### crx.downloader.downloadByURL(url): Promise

Download a CRX file by url.

- `url` string - Chrome/Edge extension url.

Resolves with CRX buffer.

#### crx.downloader.downloadById(extensionId, source): Promise

Download a CRX file by extension id and source.

- `extensionId` string - Extension id
- `source` "chrome" | "edge" - Extension source

Resolves with CRX buffer.

### crx.parser

#### crx.parser.isCrx(crxPathOrBuffer): Boolean

Checks whether the given path or Buffer contains a valid CRX file.

- `crxPathOrBuffer` string | Buffer - CRX file path or buffer.

#### crx.parser.getCrxVersion(crxPathOrBuffer): Number

Get CRX file version.

- `crxPathOrBuffer` string | Buffer - CRX file path or buffer.

#### crx.parser.getZipContents(crxPathOrBuffer): Buffer

Convert a CRX Buffer to a Zip Buffer.

- `crxPathOrBuffer` string | Buffer - CRX file path or buffer.

#### crx.parser.extract(crxPathOrBuffer, output?)

Extract a local CRX file.

- `crxPathOrBuffer` string | Buffer - CRX file path or buffer.
- `output` string (optional) - It will be extracted to `${output}/${crxFileName}`. Default by `process.cwd()`.
