const Invite = require('../models/invite'),
      helper = require('./helper');

module.exports.acceptInvite = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!invite) return res.status(404).json({
      success: false,
      error: 'Invite does not exist.'
    })

    if (invite.to != req.user._id) return res.status(401).json({
      success: false,
      error: 'The invite was not sent to you.'
    })

    Invite.findByIdAndUpdate(req.params.inviteID, {accepted: true}, {new: true}, function(error, invite) {
      if (error) return helper.mongooseValidationError(error, res);

      res.status(200).json({
        success: true,
        invite: invite
      })
    });
  })
};