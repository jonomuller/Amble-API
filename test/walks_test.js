const request = require('supertest'),
      app = require('../app'),
      uriPrefix = '/api/walks'
      mongoose = require('mongoose'),
      helper = require('./helper');

var jwt,
    testWalk = {
      id: '0001',
      name: 'Test Walk',
      coordinates: '[[1.02, 3.204], [34543.234, 3432], [43.4, 76]]',
      image: 'image_url',
      achievements: '[{"name": "DISTANCE", "value": 1234}, {"name": "DAY_STREAK", "value": 200}]',
      time: 234,
      distance: 32545,
      steps: 23590248950
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
          testWalk.id = res.body.walk._id;
          res.body.success.should.be.equal(true);
          res.body.walk.achievements.should.have.length(2);
        })
        .expect(201, done);
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
          res.body.error.should.be.equal('Path `name` is required.')
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

    it('should fail with invalid achievement type', function(done) {
      var invalid_name = 'invalid_name';
      testWalk.achievements = '[{"name": "DISTANCE", "value": 1234}, {"name": "' + invalid_name + '", "value": 200}]';
      request(app)
        .post(uriPrefix + '/create')
        .set('Authorization', 'JWT ' + jwt)
        .send(testWalk)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('`' + invalid_name + '` is an invalid achievement type.')
          testWalk.achievements = null;
        })
        .expect(400, done);
    })
  });
});

describe('GET /:walkID', function() {
  describe('Valid walk retrieval', function() {
    it('should return walk with valid ID', function(done) {
      request(app)
        .get(uriPrefix + '/' + testWalk.id)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
        })
        .expect(200, done);
    });
  });

  describe('Invalid walk retrieval', function() {
    it('should fail with invalid ID', function(done) {
      let invalid_id = "invalid_id"
      request(app)
        .get(uriPrefix + '/' + invalid_id)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Cast to ObjectId failed for value "' 
            + invalid_id + '" at path "_id" for model "Walk"')
        })
        .expect(400, done);
    });

    it('should fail with ID not found', function(done) {
      var notFoundID = '000000000000'
      request(app)
        .get(uriPrefix + '/' + notFoundID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('No walk with that ID can be found.')
        })
        .expect(404, done);
    });
  });

    // Clear database
  after(function(done) {
    helper.clearDB('users');
    helper.clearDB('walks', done);
  });
});