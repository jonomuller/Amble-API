const Invite = require('../models/invite'),
      helper = require('./helper');

module.exports.acceptInvite = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!invite) return res.status(404).json({
      success: false,
      error: 'Invite does not exist.'
    })

    if (!invite.to.equals(req.user._id)) return res.status(401).json({
      success: false,
      error: 'The invite was not sent to you.'
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