const express = require('express'),
      usersRouter = express.Router(),
      users = require('../controllers/users'),
      helper = require('./helper');

usersRouter.get('/:userID', helper.jwtAuth, users.getInfo);
usersRouter.get('/:userID/walks', helper.jwtAuth, users.getWalks);
usersRouter.get('/search/:userInfo', users.search);
usersRouter.get('/register/:token', helper.jwtAuth, users.registerToken);
usersRouter.post('/invite', helper.jwtAuth, users.invite);
usersRouter.get('/invites/sent', helper.jwtAuth, users.getSentInvites);
usersRouter.get('/invites/received', helper.jwtAuth, users.getReceivedInvites);

module.exports = usersRouter;