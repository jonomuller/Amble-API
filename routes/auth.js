const express = require('express'),
      authRouter = express.Router(),
      auth = require('../controllers/auth'),
      passport = require('passport'),
      passportAuth = require('../config/passport'),
      config = require('../config/config');

var localAuth = passport.authenticate('local', config.jwtSession);

authRouter.post('/login', localAuth, auth.login);

module.exports = authRouter;