const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const { expect } = chai;

const User = require('../../../server/models/user');
const userController = rewire('../../../server/controllers/users.js');

chai.use(sinonChai);

let sandbox = null;

describe('Users controller', () => {
  let req = {
    user: { id: 1 },
    value: {
      body: {
        email: 'bob@bobber.com',
        password: '123456'
      }
    }
  };
  let res = {
    json: function() {
      return this;
    },
    status: function() {
      return this;
    }
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('secret', () => {
    it('should return resource when called', () => {
      sandbox.spy(console, 'log');
      sandbox.spy(res, 'json');

      userController.secret(req, res).then(() => {
        expect(console.log).to.have.been.called;
        expect(res.json.calledWith({ secret: 'resource' })).to.be.ok;
        expect(res.json).to.have.been.calledWith({ secret: 'resource' });
      });
    });
  });


});
