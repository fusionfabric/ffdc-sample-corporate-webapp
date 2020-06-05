const { exec, spawn } = require('child_process');

module.exports = function (cmd) {
  console.log('>', cmd);

  let command = cmd.split(' ');
  command = [command[0], [...command.slice(1, command.length)]];

  const process = spawn(...command);

  process.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  process.stderr.on('data', function (data) {
    console.error(data.toString());
  });

  process.on('exit', function (code) {
    if (code > 0) {
      console.log('child process exited with code ' + code.toString());
    }
  });
};
