const express = require('express'),
      invitesRouter = express.Router(),
      invites = require('../controllers/invites'),
      helper = require('./helper');

invitesRouter.get('/:inviteID/accept', helper.jwtAuth, invites.acceptInvite);
invitesRouter.get('/:inviteID/decline', helper.jwtAuth, invites.declineInvite);

module.exports = invitesRouter;