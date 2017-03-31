const expect = require('chai').expect,
      request = require('supertest'),
      should = require('should'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      app = require('../app'),
      uriPrefix = '/api/auth',
      testUser = {
        username: 'bob123',
        email: 'bob@bobson.com',
        password: 'amble4lyfe',
        name: {
          firstName: 'Bob',
          lastName: 'Bobson'
        }
      };

describe('POST /login', function() {

  // Save test user to database before tests begin
  before(function(done) {
    var user = new User(testUser);
    user.save(done);
  });

  describe('Valid login', function() {
    it('should log in with valid credentials', function(done) {
      request(app)
        .post(uriPrefix + '/login')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
        })
        .expect(200, done);
    });
  });

  describe('Invalid login', function() {
    it('should fail with no credentials provided', function(done) {
      request(app)
        .post(uriPrefix + '/login')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
        })
        .expect(401, done);
    });

    it('should fail with invalid username', function(done) {
      request(app)
        .post(uriPrefix + '/login')
        .send({username: 'wrong_username', password: 'amble4lyfe'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
        })
        .expect(401, done);
    });

    it('should fail with invalid password', function(done) {
      request(app)
        .post(uriPrefix + '/login')
        .send({username: 'bob123', password: 'wrong_password'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
        })
        .expect(401, done);
    })
  });

  // Clear database
  after(function(done) {
    mongoose.connection.db.dropCollection('users', function(error, result) {
      if (error) throw error;
      done();
    });
  });
});