const jwt = require('jsonwebtoken'),
      config = require('../config/config'),
      passport = require('passport'),
      User = require('../models/user');

function returnWithJWT(user, status, res) {
  token = jwt.sign(user, config.jwtSecret);
  res.status(status).json({
  user: user.username,
  jwt: token
  });
}

module.exports.login = function(req, res, next) {
  passport.authenticate('local', config.jwtSession, function(error, user, info) {
    if (error) return next(error);
    if (!user) return res.status(401).json({
                        error: info.message
                      })

    returnWithJWT(user, 200, res);
  })(req, res, next);
};

module.exports.register = function(req, res, next) {
  var username = req.body.username,
      email = req.body.email,
      password = req.body.password,
      firstName = req.body.firstName,
      lastName = req.body.lastName;

  var required = {
    "username": username,
    "email address": email,
    "password": password,
    "first name": firstName,
    "last name": lastName
  };

  for (let key in required) {
    var value = required[key];
    if (!value) return res.status(400).json({
                         error: `Please enter your ${key}.`
                       })
  }

  User.findOne({username: username}, function(error, foundUsername) {
    if (error) return next(error);
    if (foundUsername) return res.status(400).json({
                                error: 'A user with that username already exists.'
                              })

    User.findOne({email: email}, function(error, foundEmail) {
      if (error) return next(error);
      if (foundEmail) return res.status(400).json({
                               error: 'A user with that email already exists.'
                             })

      var user = User({
        name: {
          firstName,
          lastName
        },
        username,
        email,
        password
      });

      user.save(function(error) {
        if (error) return next(error);
        returnWithJWT(user, 201, res);
      });
    });
  });
}