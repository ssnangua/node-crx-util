const crx = require("./");

const chrome =
  "https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd";
const edge =
  "https://microsoftedge.microsoft.com/addons/detail/vuejs-devtools/olofadcdnkkjdfgjcmjaadnlehnnihnl";

// crx.downloadByURL(edge);
crx.downloadByURL(edge, "./vuejs_devtools.crx");
// crx.downloadById("olofadcdnkkjdfgjcmjaadnlehnnihnl", "edge");
// crx.downloadById("olofadcdnkkjdfgjcmjaadnlehnnihnl", "edge", "./vuejs_devtools.crx");

// crx.downloadByURL(chrome);
// crx.downloadByURL(chrome, "./vuejs_devtools.crx");
// crx.downloadById("nhdogjmejiglipccpnnnanhbledajbpd", "chrome");
// crx.downloadById("nhdogjmejiglipccpnnnanhbledajbpd", "chrome", "./vuejs_devtools.crx");

// crx.parser.extract("./vuejs_devtools.crx", "./vuejs_devtools");

// const version = crx.parser.getCrxVersion("./vuejs_devtools.crx");
// console.log(version);
