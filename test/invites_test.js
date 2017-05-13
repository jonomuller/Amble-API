const request = require('supertest'),
      app = require('../app'),
      uriPrefix = '/api/invites'
      mongoose = require('mongoose'),
      helper = require('./helper');

var username = 'bob1234',
    email = 'bob@bobson.com',
    password = 'amble4lyfe',
    firstName = 'Bob',
    lastName = 'Bobson'

describe('GET /:inviteID/accept', function() {

  var anotherUser, anotherUserJWT, inviteID;

  before(function(done) {
    var jwt;

    request(app)
      .post('/api/auth/register')
      .send({username: username, email: email, 
        password: password, firstName: firstName, lastName: lastName})
      .end(function(err, res) {
        if (err) return done(err);
        jwt = res.body.jwt;
        request(app)
          .post('/api/auth/register')
          .send({username: '123', email: '123@gmail.com', 
            password: '12345', firstName: 'Hello', lastName: 'World'})
          .end(function(err2, res2) {
            if (err2) return done(err2);
            anotherUser = res2.body.user;
            anotherUserJWT = res2.body.jwt;
            request(app)
              .post('/api/users/invite/' + anotherUser._id)
              .set('Authorization', 'JWT ' + jwt)
              .send({date: '01/01/70'})
              .end(function(err3, res3) {
                if (err3) return done(err3);
                inviteID = res3.body.invite._id;
                done();
              });
          });
      });
  });

  describe('Valid invite accept', function() {
    it('should accept valid invite', function(done) {
      request(app)
        .get(uriPrefix + '/' + inviteID + '/accept')
        .set('Authorization', 'JWT ' + anotherUserJWT)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          res.body.success.should.be.equal(true);
          res.body.invite.accepted.should.be.equal(true);
        })
        .expect(200, done);
    })
  })

  after(function(done) {
    helper.clearDB('users');
    helper.clearDB('invites', done);
  });
});