const passport = require('passport'),
      passportJWT = require('passport-jwt'),
      LocalStrategy = require('passport-local').Strategy,
      JwtStrategy = passportJWT.Strategy,
      ExtractJwt = passportJWT.ExtractJwt,
      config = require('./config'),
      User = require('../models/user');

const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
}

// Used to log user in via username and password
passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({username: username}, function(error, user) {
    if (error) return done(error);
    if (!user) return done(null, false);
    console.log('found username');

    user.comparePassword(password, function(error, success) {
      if (error) return done(error);
      if (!success) {
        console.log('passwords don\'t match');
        return done(null, false);
      }
      console.log('passwords match');
      done(null, user);
    });
  });
}));

// Used to verify if user is authenticated without them having to log in again
// with username and password
passport.use(new JwtStrategy(options, function(jwt_payload, done) {
  User.findById(jwt_payload._id, function(error, user) {
    if (error) return done(error, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));