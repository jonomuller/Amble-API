const express = require('express'),
      usersRouter = express.Router(),
      users = require('../controllers/users'),
      helper = require('./helper');

usersRouter.get('/:userID/walks', helper.jwtAuth, users.getWalks);
usersRouter.get('/search/:userID', users.search);

module.exports = usersRouter;