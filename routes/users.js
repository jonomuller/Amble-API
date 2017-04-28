const express = require('express'),
      usersRouter = express.Router(),
      users = require('../controllers/users');

usersRouter.get('/:userID/walks', users.getWalks);

module.exports = usersRouter;