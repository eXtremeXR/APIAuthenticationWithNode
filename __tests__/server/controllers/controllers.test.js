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

  describe('signIn', () => {
    it('should return token when signIn called', () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      /* this test we are going to only test for 200.
          and that res.json was called only ones
          next test we are going to fake jwt token */
      userController.signIn(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      });
    });

    it('should return fake token using rewire', () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      // fake jwt token with rewire
      let signToken = userController.__set__('signToken', function(user) {
        return 'fakeToken';
      });

      // we expect res json to have been called with our fake token
      userController.signIn(req, res).then(() => {
        expect(res.json).to.have.been.calledWith({ token: 'fakeToken' });
        signToken();
      });
    });
  });



});
