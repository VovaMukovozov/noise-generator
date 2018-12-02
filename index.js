'use strict';
const Promise = require("bluebird");
const config = require('config');
const scan = require('./api/scan');
const httpNoise = require('./api/httpNoise');
const ports = require('./api/portsGenerator')(config.get('ports.default'), config.get('ports.range'));
const openPorts = [];
const host = process.argv[2];

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

if(!host) {
  process.exit(1);
}

Promise.map(ports, (port) => {
  return scan(port, {host}).then( (result) => {
    if(result){
      openPorts.push(port);
    }
    return true;
  });
}).then( () => {
  return Promise.map(openPorts, (port) => {
    return Promise.all([httpNoise(port, host, 'http', 0), httpNoise(port, host, 'https', 0)]); // TODO call to FTP Noise
  });
}).then( (result) => {
  console.log(result);
}).catch( (err) => {
  console.log(err);
});
