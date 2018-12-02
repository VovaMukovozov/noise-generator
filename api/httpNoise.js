'use strict';
const config = require('config');
const Promise = require("bluebird");
const rp = require('request-promise');

const httpNoise = (port, host, protocol, count) => {
  if(count > config.get('noise.retry') - 1) {
    return Promise.resolve(`Noise to ${protocol}://${host}:${port} compiled, was re-sends ${count}`);
  }
  const options = {
    // Generate certificate configuration and provide to request if function got https protocol
    // ca: [fs.readFileSync([certificate path], {encoding: 'utf-8'})],
    // rejectUnauthorized: true,
    // requestCert: true,
    // agent: false
      uri: `${protocol}://${host}:${port}`,
      json: true
  };

  return rp(options).then( (response) => {
    count++;
    console.log(`${protocol} re-sends to ${host}:${port}`, count);
    return httpNoise(port, host, protocol, count);
  }).catch((err) => {
    count = 0;
    return Promise.resolve(`Noise to ${protocol}://${host}:${port} crashed, was re-sends ${count}`);
  });
}

module.exports = httpNoise;
