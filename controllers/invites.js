const Invite = require('../models/invite'),
      helper = require('./helper');

module.exports.acceptInvite = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);
    if (!invite) return inviteDoesNotExist(res);
    if (!checkInviteAuth(req.user._id, res, invite.to)) return inviteAuthError(res);

    var allAccepted = true;

    for (let key in invite.to) {
      if (req.user._id.equals(invite.to[key].user)) invite.to[key].accepted = true;
      if (invite.to[key].user && !invite.to[key].accepted) {
        allAccepted = false;
      } 
    }

    if (allAccepted) invite.accepted = true;

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
    if (!invite) return inviteDoesNotExist(res);

    if (!checkInviteAuth(req.user._id, res, invite.to)) return inviteAuthError(res);
    removeInvite(invite, res);
  })
};

module.exports.startWalk = function(req, res, next) {
  Invite.findById(req.params.inviteID, function(error, invite) {
    if (error) return helper.mongooseValidationError(error, res);
    if (!invite) return inviteDoesNotExist(res);

    if (!req.user._id.equals(invite.from)) return inviteAuthError(res);
    removeInvite(invite, res);
  });
};


// Helper functions

function inviteDoesNotExist(res) {
  return res.status(404).json({
           success: false,
           error: 'Invite does not exist.'
         })
}

function inviteAuthError(res) {
  return res.status(401).json({
                  success: false,
                  error: 'You are not authorised to modify this invite.'
                })
}

function checkInviteAuth(userID, res, users) {
  var valid = false;

  for (let key in users) {
    if (userID.equals(users[key].user)) valid = true;
  }

  return valid;
}

function removeInvite(invite, res) {
  invite.remove(function(error) {
    if (error) return helper.mongooseValidationError(error, res);

    return res.status(200).json({
             success: true
           })
  });
}