const spawn = require('../spawn');

const HerokuPostBuildCmd = 'npm run build:prod';
const downloadArtifactCmd = 'node ./tools/scripts/download-artifact';
const cmd = process.env.FAST_BUILD ? downloadArtifactCmd : HerokuPostBuildCmd;

spawn(cmd);
