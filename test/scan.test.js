'use strict';
const chai = require('chai');
const expect = chai.expect;
const scan = require('../api/scan');

describe('Scan API', () => {
  describe('with correct connection', () => {
    let result, error = null;
    before(async () => {
      try {
        result = await scan(443, {host: 'www.ynet.co.il'});
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return "true"', () => {
      expect(result).to.be.true;
    });
  });
  describe('with incorrect connection', () => {
    let result, error = null;
    before(async () => {
      try {
        result = await scan(443, {host: 'invalid-link'});
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return "false"', () => {
      expect(result).to.be.false;
    });
  });
});
