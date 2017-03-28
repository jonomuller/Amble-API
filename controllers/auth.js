const jwt = require('jsonwebtoken'),
      config = require('../config/config');

module.exports.login = function(req, res, next) {
  token = jwt.sign(req.user, config.jwtSecret);
  res.status(200).json({
    user: req.user.username,
    jwt: token
  });
};