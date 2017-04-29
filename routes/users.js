const express = require('express'),
      usersRouter = express.Router(),
      users = require('../controllers/users'),
      helper = require('./helper');

usersRouter.get('/:userID/walks', helper.jwtAuth, users.getWalks);

module.exports = usersRouter;