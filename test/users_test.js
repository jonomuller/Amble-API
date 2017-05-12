const request = require('supertest'),
      app = require('../app'),
      uriPrefix = '/api/users'
      mongoose = require('mongoose'),
      helper = require('./helper');

var jwt,
    userID,
    testWalk = {
      id: '0001',
      name: 'Test Walk',
      owner: '0001',
      coordinates: '[[1.02, 3.204], [34543.234, 3432], [43.4, 76]]',
      image: 'image_url',
      time: 234,
      distance: 32545,
      steps: 23590248950
    };

var username = 'bob1234',
    email = 'bob@bobson.com',
    password = 'amble4lyfe',
    firstName = 'Bob',
    lastName = 'Bobson'

var invalidID = 'invalid_id',
    notFoundID = '000000000000'

describe('GET /:userID/walks', function() {

  before(function(done) {
    request(app)
      .post('/api/auth/register')
      .send({username: username, email: email, 
        password: password, firstName: firstName, lastName: lastName})
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
      request(app)
        .get(uriPrefix + '/' + invalidID + '/walks')
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Cast to ObjectId failed for value "' 
            + invalidID + '" at path "owner" for model "Walk"')
        })
        .expect(400, done);
    });
  });

  // Clear database
  after(function(done) {
    helper.clearDB('walks', done);
  });
});

describe('GET /:userID', function(){

  describe('Valid user retrieval', function() {
    it('should return user given valid ID', function(done) {
      request(app)
        .get(uriPrefix + '/' + userID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.user._id.should.be.equal(userID);
        })
        .expect(200, done);
    });
  });

  describe('Invalid user retrieval', function() {
    it('should fail with invalid user ID', function(done) {
      request(app)
        .get(uriPrefix + '/' + invalidID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Cast to ObjectId failed for value "' 
            + invalidID + '" at path "_id" for model "User"');
        })
        .expect(400, done);
    });

    it('should fail with user ID not found', function(done) {
      request(app)
        .get(uriPrefix + '/' + notFoundID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('No user could be found for that ID.');
        })
        .expect(404, done);
    });
  });

});

describe('GET /search/:userInfo', function() {
  describe('Valid user search', function () {
    it('should return user when searching with valid username', function(done) {
      request(app)
        .get(uriPrefix + '/search/' + username)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(1);
          res.body.users[0].username.should.be.equal(username);
        })
        .expect(200, done);
    });

    it('should return user when searching with valid email', function(done) {
      request(app)
        .get(uriPrefix + '/search/' + email)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(1);
          res.body.users[0].username.should.be.equal(username);
        })
        .expect(200, done);
    });

    it('should return user when searching with valid first name', function(done) {
      request(app)
        .get(uriPrefix + '/search/' + firstName)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(1);
          res.body.users[0].username.should.be.equal(username);
        })
        .expect(200, done);
    });

    it('should return user when searching with valid last name (case insensitive)', function(done) {
      request(app)
        .get(uriPrefix + '/search/' + lastName.toUpperCase())
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(1);
          res.body.users[0].username.should.be.equal(username);
        })
        .expect(200, done);
    });

    it('should return user when searching with valid full name', function(done) {
      request(app)
        .get(uriPrefix + '/search/' + firstName + ' ' + lastName)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(1);
          res.body.users[0].username.should.be.equal(username);
        })
        .expect(200, done);
    });

    it('should return empty array with username not found', function(done) {
      request(app)
        .get(uriPrefix + '/search/invalid_username')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(0);
        })
        .expect(200, done);
    });

    it('should return empty array with name not found', function(done) {
      request(app)
        .get(uriPrefix + '/search/invalid name')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.users.should.have.length(0);
        })
        .expect(200, done);
    });
  });
});

describe('GET /:userID/register/:token', function() {

  var deviceToken = 'device_token';

  describe('Valid token registration', function() {
    it('should succeed with valid user ID and valid token', function(done) {
      request(app)
        .get(uriPrefix + '/register/' + deviceToken)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.user.deviceToken.should.be.equal(deviceToken);
        })
        .expect(200, done);
    });
  });
});

describe('POST /invite/:userID', function() {
  describe('Valid invitiation', function() {
    it('should succeed with valid user ID', function(done) {
      request(app)
        .post(uriPrefix + '/invite/' + userID)
        .set('Authorization', 'JWT ' + jwt)
        .send({date: '01/01/70'})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.invite.to.should.be.equal(userID);
        })
        .expect(200, done);
    });
  });

  describe('Invalid invitiation', function() {
    it('should fail with invalid user ID', function(done) {
      request(app)
        .post(uriPrefix + '/invite/' + invalidID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('Cast to ObjectId failed for value "' 
            + invalidID + '" at path "_id" for model "User"');
        })
        .expect(400, done);
    });

    it('should fail with user ID not found', function(done) {
      request(app)
        .post(uriPrefix + '/invite/' + notFoundID)
        .set('Authorization', 'JWT ' + jwt)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(false);
          res.body.error.should.be.equal('User does not exist.');
        })
        .expect(404, done);
    });
  });

  after(function(done) {
    helper.clearDB('users', done);
  });
});