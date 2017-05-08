const expect = require('chai').expect,
      request = require('supertest'),
      should = require('should'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      app = require('../app'),
      uriPrefix = '/api/auth',
      helper = require('./helper'),
      testUser = {
        username: 'bob123',
        email: 'bob@bobson.com',
        password: 'amble4lyfe',
        firstName: 'Bob',
        lastName: 'Bobson'
      };

describe('POST /login', function() {

  // Save test user to database before tests begin
  before(function(done) {
    var user = new User({
      username: 'bob123',
      email: 'bob@bobson.com',
      password: 'amble4lyfe',
      name: {
        firstName: 'Bob',
        lastName: 'Bobson'
      },
      score: 0,
      distance: 0,
      steps: 0
    })
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
    clearDB(done);
  });
});


describe('POST /register', function() {
  describe('Valid register', function() {
    it('should register user with valid credentials', function(done) {
      request(app)
        .post(uriPrefix + '/register')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
        })
        .expect(201, done);
    });
  });

  describe('Invalid register', function() {
    it('should fail with no credentials provided', function(done) {
      request(app)
        .post(uriPrefix + '/register')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Path `username` is required.')
        })
        .expect(400, done);
    });

    it('should fail with some credentials missing', function(done) {
      request(app)
        .post(uriPrefix + '/register')
        .send({username: 'bob', email: 'bobby@bob.com', password: 'amble4lyfe'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Path `name.firstName` is required.')
        })
        .expect(400, done);
    });

    it('should fail with username that already exists', function(done) {
      request(app)
        .post(uriPrefix + '/register')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('A user with that username already exists.')
        })
        .expect(400, done);
    });

    it('should fail with email address that already exists', function(done) {
      request(app)
        .post(uriPrefix + '/register')
        .send({username: 'bob1234', email: 'bob@bobson.com', 
          password: 'amble4lyfe', firstName: 'Bob', lastName: 'Bobson'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('A user with that email address already exists.')
        })
        .expect(400, done);
    });
  });

  after(function(done) {
    clearDB(done);
  });
});

function clearDB(done) {
  helper.clearDB('users', done);
}