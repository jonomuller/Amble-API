const request = require('supertest'),
      app = require('../app'),
      uriPrefix = '/api/walks'
      mongoose = require('mongoose'),
      helper = require('./helper');

var jwt,
    testWalk = { 
      name: 'Test Walk',
      owner: '0001',
      coordinates: '[[1.02, 3.204], [34543.234, 3432], [43.4, 76]]'
    };

describe('POST /create', function() {

  before(function(done) {
    request(app)
      .post('/api/auth/register')
      .send({username: 'bob1234', email: 'bob@bobson.com', 
        password: 'amble4lyfe', firstName: 'Bob', lastName: 'Bobson'})
      .end(function(err, res) {
        if (err) return done(err);
        jwt = res.body.jwt;
        testWalk.owner = res.body.user._id
        done();
      });
  });

  describe('Valid walk creation', function() {
    it('should create and save walk with valid details', function(done) {
      request(app)
        .post(uriPrefix + '/create')
        .set('Authorization', 'JWT ' + jwt)
        .send(testWalk)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
        })
        .expect(200, done);
    });
  });

  describe('Invalid walk creation', function() {
    it('should fail with missing details', function(done) {
      request(app)
        .post(uriPrefix + '/create')
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Please enter the name.')
        })
        .expect(400, done);
    });

    it('should fail with no JWT authorization', function(done) {
      request(app)
        .post(uriPrefix + '/create')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal("No auth token");
        })
        .expect(401, done);
    });

    it('should fail with invalid JWT', function(done) {
      request(app)
        .post(uriPrefix + '/create')
        .set('Authorization', 'JWT invalid_jwt')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal("jwt malformed")
        })
        .expect(401, done);
    })
  });

  // Clear database
  after(function(done) {
    helper.clearDB('users', done);
    helper.clearDB('walks', done);
  });
});