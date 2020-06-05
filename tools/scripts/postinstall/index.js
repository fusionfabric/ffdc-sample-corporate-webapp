const { exec } = require('child_process');

if (process.env.GITHUB_TOKEN) return;

const postinstallCmd =
  'ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points';

exec(postinstallCmd, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
