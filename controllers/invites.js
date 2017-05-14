const Invite = require('../models/invite'),
      helper = require('./helper');

module.exports.acceptInvite = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!invite) return res.status(404).json({
      success: false,
      error: 'Invite does not exist.'
    })

    invite.accepted = true;

    invite.save(function(error) {
      if (error) return helper.mongooseValidationError(res)

      res.status(200).json({
        success: true,
        invite: invite
      })
    });
  });
};

module.exports.declineInvite = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!invite) return res.status(404).json({
      success: false,
      error: 'Invite does not exist.'
    })

    invite.remove(function(error) {
      if (error) return helper.mongooseValidationError(error, res);

      res.status(200).json({
        success: true
      })
    })
  })
};