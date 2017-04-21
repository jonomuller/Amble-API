const Walk = require('../models/walk'),
      passport = require('passport'),
      config = require('../config/config');

module.exports.create = function(req, res, next) {
  passport.authenticate('jwt', config.jwtSession, function(error, user, info) {
    if (error) return next(error);
    if (!user) return res.status(401).json({
                    success: false,
                    error: info.message
                  })
    res.json({
    test: 'test'
    });
  })(req, res, next);
};