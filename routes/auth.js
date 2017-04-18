const express = require('express'),
      authRouter = express.Router(),
      auth = require('../controllers/auth'),
      passportAuth = require('../config/passport'),
      config = require('../config/config');

authRouter.post('/login', auth.login);
authRouter.post('/register', auth.register);

module.exports = authRouter;