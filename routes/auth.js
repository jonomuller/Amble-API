const express = require('express'),
      authRouter = express.Router(),
      auth = require('../controllers/auth');

authRouter.post('/login', auth.login);
authRouter.post('/register', auth.register);

module.exports = authRouter;