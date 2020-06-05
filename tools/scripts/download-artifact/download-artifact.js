const { createWriteStream } = require('fs');
const axios = require('axios');
const token = process.env.GITHUB_TOKEN;
const headers = {
  authorization: 'Bearer ' + token,
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
