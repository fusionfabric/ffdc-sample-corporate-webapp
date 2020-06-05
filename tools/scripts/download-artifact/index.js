const axios = require('axios');
const { join } = require('path');
const getArtifactUrl = require('./get-artifact-url');
const downloadArtifact = require('./download-artifact');
const unzip = require('./unzip');

const owner = 'fusionfabric';
const repo = 'ffdc-sample-corporate-webapp';
const zipPath = join(process.cwd(), 'dist.zip');
const targetPath = join(process.cwd(), 'dist');

(async () => {
  const artifactUrl = await getArtifactUrl(owner, repo);
  console.log('✅ Artifact url :', artifactUrl);

  await downloadArtifact(artifactUrl, zipPath);
  console.log(`✅ 'dist.zip' downloaded from last build's artifact !`);

  await unzip(zipPath, targetPath);
  console.log(`✅ 'dist.zip' extracted !`);
})();
