const express = require('express'),
      authRouter = express.Router(),
      passportAuth = require('./config/passport');



module.exports = authRouter;