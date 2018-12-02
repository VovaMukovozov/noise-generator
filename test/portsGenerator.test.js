'use strict';
const chai = require('chai');
const expect = chai.expect;
const portsGenerator = require('../api/portsGenerator');

describe('portsGenerator API', () => {
  describe('with missing default ports', () => {
    let result, error = null;
    before(async () => {
      try {
        result = portsGenerator(null, [0, 10]);
      } catch (e) {
        error = e;
      }
    });
    it('Should catch exception', () => {
      expect(error.message).to.equal('portDefault or portRange should be array');
    });
  });
  describe('with missing range ports', () => {
    let result, error = null;
    before(async () => {
      try {
        result = portsGenerator([1,2]);
      } catch (e) {
        error = e;
      }
    });
    it('Should catch exception', () => {
      expect(error.message).to.equal('portDefault or portRange should be array');
    });
  });

  describe('with empty default ports', () => {
    let result, error = null;
    before(async () => {
      try {
        result = portsGenerator([], [1,2]);
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return correct array', () => {
      expect(result[0]).to.equal(1);
      expect(result[1]).to.equal(2);
    });
  });
  describe('with empty range ports', () => {
    let result, error = null;
    before(async () => {
      try {
        result = portsGenerator([1,2], []);
      } catch (e) {
        error = e;
      }
    });
    it('Should not faild', () => {
      expect(error).to.be.null;
    });
    it('Should return correct array', () => {
      expect(result[0]).to.equal(1);
      expect(result[1]).to.equal(2);
    });
  });
});
