// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;

const server = require('../../../server/app');

chai.use(chaiHttp);

let token;

describe('Users route', () => {
  const signup = '/users/signup';
  const signin = '/users/signin';
  const secret = '/users/secret';
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const preSave = {
    email: 'mr.sometest@gmail.com',
    password: faker.internet.password(),
  };

  before(async () => {
    const result = await chai
      .request(server)
      .post(signup)
      .send(preSave);
    expect(result.status).to.equal(200);
    token = result.body.token;
  });

  // after all test have run we drop our test database
  after('droping test db', async () => {
    await mongoose.connection.dropDatabase(() => {
      console.log('\n Test database dropped');
    });
    await mongoose.connection.close();
  });

  describe('signup', () => {
    it('should crete new user if email not found', async () => {
      try {
        const result = await chai
          .request(server)
          .post(signup)
          .send(user);
        expect(result.status).to.equal(200);
        expect(result.body).not.to.be.empty;
        expect(result.body).to.have.property('token');
      } catch (error) {
        console.log(error);
      }
    });

    it('should return 403 if email was found', async () => {
      try {
        await chai
          .request(server)
          .post(signup)
          .send(preSave);
      } catch (error) {
        expect(error.status).to.equal(403);
        expect(error.response.text).to.equal('{"error":"Email is already in use"}');
      }
    });
  });

  describe('secrete', () => {
    it('should return status 401', async () => {
      try {
        await chai.request(server).get(secret);
      } catch (error) {
        expect(error.status).to.equal(401);
        expect(error.response.text).to.equal('Unauthorized');
      }
    });

    it('should return status 200', async () => {
      try {
        const result = await chai
          .request(server)
          .get(secret)
          .set('Authorization', token);

        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal({ secret: 'resource' });
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('signin', () => {
    it('should return error 400 if user email and password empty', async () => {
      let user = {};
      try {
        const result = await chai
          .request(server)
          .post(signin)
          .send(user);
      } catch (error) {
        expect(error.status).to.be.equal(400);
      }
    });

    it('should return 200 and our token', async () => {
      try {
        const result = await chai
          .request(server)
          .post(signin)
          .send(preSave);

        expect(result.status).to.be.equal(200);
        expect(result.body).not.to.be.empty;
        expect(result.body).to.have.property('token');
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
