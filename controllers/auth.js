const jwt = require('jsonwebtoken'),
      config = require('../config/config'),
      passport = require('passport');

module.exports.login = function(req, res, next) {
  passport.authenticate('local', config.jwtSession, function(error, user, info) {
    if (error) return next(error);
    if (!user) return res.status(401).json({
                        error: info.message
                      })

    token = jwt.sign(user, config.jwtSecret);
    res.status(200).json({
      user: user.username,
      jwt: token
    });
  })(req, res, next);
};