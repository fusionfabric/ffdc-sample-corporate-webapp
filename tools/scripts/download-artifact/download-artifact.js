const axios = require('axios');
const { createWriteStream } = require('fs');
const { github } = require('./token');
const headers = {
  authorization: 'Bearer ' + github,
};

module.exports = async function (url, path) {
  const writer = createWriteStream(path);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers,
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};
