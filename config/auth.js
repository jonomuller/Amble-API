const passport = require('passport'),
      passportJWT = require('passport-jwt'),
      ExtractJWT = passportJWT.ExtractJwt,
      JwtStrategy = passportJWT.Strategy,
      config = require('./main'),
      User = require('../models/user');

const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
}

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