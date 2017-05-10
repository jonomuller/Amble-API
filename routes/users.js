const express = require('express'),
      usersRouter = express.Router(),
      users = require('../controllers/users'),
      helper = require('./helper');

usersRouter.get('/:userID', helper.jwtAuth, users.getInfo);
usersRouter.get('/:userID/walks', helper.jwtAuth, users.getWalks);
usersRouter.get('/search/:userInfo', users.search);
usersRouter.post('/:userID/register/:token', helper.jwtAuth, users.registerToken);

module.exports = usersRouter;