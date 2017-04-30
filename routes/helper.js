const passport = require('passport'),
      config = require('../config/config');

module.exports.jwtAuth = function(req, res, next) {
  passport.authenticate('jwt', config.jwtSession, function(error, user, info) {
    if (error) return next(error);
    var message = info ? info.message : "Invalid token";
    if (!user) return res.status(401).json({
                    success: false,
                    error: message
                  })
    next();
  })(req, res, next);
};