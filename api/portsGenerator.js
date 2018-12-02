'use strict';
const { isArray } = require('lodash');
module.exports = (portDefault, portRange) => {
  if(!isArray(portDefault) || !isArray(portRange)) throw new Error('portDefault or portRange should be array');
  const ports = [];
  for (let i = portRange[0]; i <= portRange[1]; i++) {
    ports.push(i);
  }
  return portDefault.concat(ports);
};
