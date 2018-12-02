'use strict';
const chai = require('chai');
const expect = chai.expect;
const httpNoise = require('../api/httpNoise');

describe('httpNoise API', () => {
  describe('with correct url', () => {
    let result, error = null;
    before(async () => {
      try {
        result = await httpNoise(80, 'google.com', 'http', 0);
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return correct string', () => {
      expect(result).to.equal('Noise to http://google.com:80 compiled, was re-sends 20');
    });
  });

  describe('with incorrect url', () => {
    let result, error = null;
    before(async () => {
      try {
        result = await httpNoise(80, 'invalid', 'http', 0);
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return correct string', () => {
      expect(result).to.equal('Noise to http://invalid:80 crashed, was re-sends 0');
    });
  });
});
