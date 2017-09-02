const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const { expect } = chai;


chai.use(sinonChai);


describe('first test', function() {
  it('should be true', () =>{
    expect(true).to.eql(true);
  })
});
