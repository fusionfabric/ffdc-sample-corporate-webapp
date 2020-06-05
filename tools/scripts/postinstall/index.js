const spawn = require('../spawn');

if (process.env.FAST_BUILD) return;

const postinstallCmd =
  'npx ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points';

spawn(postinstallCmd);
