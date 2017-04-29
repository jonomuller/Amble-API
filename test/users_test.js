const request = require('supertest'),
      app = require('../app'),
      uriPrefix = '/api/users/'
      mongoose = require('mongoose'),
      helper = require('./helper');

var jwt,
    userID,
    testWalk = {
      id: '0001',
      name: 'Test Walk',
      owner: '0001',
      coordinates: '[[1.02, 3.204], [34543.234, 3432], [43.4, 76]]',
      time: 234,
      distance: 32545,
      steps: 23590248950
    };

describe('GET /:userID/walks', function() {

  before(function(done) {
    request(app)
      .post('/api/auth/register')
      .send({username: 'bob1234', email: 'bob@bobson.com', 
        password: 'amble4lyfe', firstName: 'Bob', lastName: 'Bobson'})
      .end(function(err, res) {
        if (err) return done(err);
        jwt = res.body.jwt;
        userID = res.body.user._id;
        testWalk.owner = userID;

        request(app)
          .post('/api/walks/create')
          .set('Authorization', 'JWT ' + jwt)
          .send(testWalk)
          .end(function(err, res) {
            done();
          });
      });
  });

  describe('Valid walks retrieval', function() {
    it('should return walks for valid user ID', function(done) {
      request(app)
        .get(uriPrefix + '/' + userID + '/walks')
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.walks.should.have.a.length(1);
        })
        .expect(200, done);
    });

    it('should return empty array for user with no walks', function(done) {
      var notFoundID = '000000000000'
      request(app)
        .get(uriPrefix + '/' + notFoundID + '/walks')
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.walks.should.have.length(0);
        })
        .expect(200, done);
    });
  });

  describe('Invalid walks retrieval', function() {
    it('should fail with invalid ID', function(done) {
      let invalid_id = "invalid_id"
      request(app)
        .get(uriPrefix + '/' + invalid_id + '/walks')
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Cast to ObjectId failed for value "' 
            + invalid_id + '" at path "owner" for model "Walk"')
        })
        .expect(400, done);
    });
  });

  // Clear database
  after(function(done) {
    helper.clearDB('users');
    helper.clearDB('walks', done);
  });
});