const AdmZip = require('adm-zip');

module.exports = async function (zipPath, targetPath) {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(targetPath, true);
};
