// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';

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
    user: {
      id: faker.random.number(),
    },
    value: {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    },
  };
  let res = {
    json: function() {
      return this;
    },
    status: function() {
      return this;
    },
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('secret', () => {
    it('should return resource when called', async () => {
      sandbox.spy(console, 'log');
      sandbox.spy(res, 'json');

      try {
        await userController.secret(req, res);

        expect(console.log).to.have.been.called;
        expect(
          res.json.calledWith({
            secret: 'resource',
          }),
        ).to.be.ok;
        expect(res.json).to.have.been.calledWith({
          secret: 'resource',
        });
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('signIn', () => {
    it('should return token when signIn called', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      try {
        await userController.signIn(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      } catch (error) {
        throw new Error(error);
      }
    });

    it('should return fake token using rewire', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      // fake jwt token with rewire
      let signToken = userController.__set__('signToken', user => 'fakeToken');

      try {
        await userController.signIn(req, res);

        expect(res.json).to.have.been.calledWith({
          token: 'fakeToken',
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('signUp', () => {
    it('should return 403 if the user is already save in the db.', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');
      sandbox.stub(User, 'findOne').returns(
        Promise.resolve({
          id: faker.random.number(),
        }),
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(403);
        expect(res.json).to.have.been.calledWith({
          error: 'Email is already in use',
        });
      } catch (error) {
        throw new Error(error);
      }
    });

    it('should return 200 if user is not in db and it was saved', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');
      sandbox.stub(User, 'findOne').returns(Promise.resolve(false));
      sandbox.stub(User.prototype, 'save').returns(
        Promise.resolve({
          id: faker.random.number(),
        }),
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      } catch (error) {
        throw new Error(error);
      }
    });

    it('should return 200 if user is not in db using callback done', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');
      sandbox.stub(User, 'findOne').returns(Promise.resolve(false));
      sandbox.stub(User.prototype, 'save').returns(
        Promise.resolve({
          id: faker.random.number(),
        }),
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      } catch (error) {
        throw new Error(error);
      }
    });

    it('should return fake token in res.json', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');
      sandbox.stub(User, 'findOne').returns(Promise.resolve(false));
      sandbox.stub(User.prototype, 'save').returns(
        Promise.resolve({
          id: faker.random.number(),
        }),
      );

      let signToken = userController.__set__('signToken', user => 'fakeTokenNumberTwo');

      try {
        await userController.signUp(req, res);

        expect(res.json).to.have.been.calledWith({
          token: 'fakeTokenNumberTwo',
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('googleOAuth', () => {
    it('should return token if user passed the passport google oauth', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      let signToken = userController.__set__('signToken', user => 'fakeTokenFromGoogleController');

      try {
        await userController.googleOAuth(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
          token: 'fakeTokenFromGoogleController',
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('facebookOAuth', () => {
    it('should return token if user passed the passport facebook oauth', async () => {
      sandbox.spy(res, 'json');
      sandbox.spy(res, 'status');

      let signToken = userController.__set__('signToken', user => 'fakeTokenFromFacebookController');

      try {
        await userController.facebookOAuth(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
          token: 'fakeTokenFromFacebookController',
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
