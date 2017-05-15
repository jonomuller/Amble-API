const Walk = require('../models/walk'),
      User = require('../models/user'),
      Invite = require('../models/invite'),
      helper = require('./helper'),
      config = require('../config/config'),
      apn = require('apn');

var apnProvider = new apn.Provider({  
     token: {
        key: '-----BEGIN PRIVATE KEY-----\n' + config.apnsPrivateKey + '\n-----END PRIVATE KEY-----',
        keyId: '27U39CG6UZ',
        teamId: 'QJQGH9NF7F',
    },
    production: false
});

module.exports.getInfo = function(req, res, next) {
  User.findById(req.params.userID, function(error, user) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!user) return res.status(404).json({
      success: false,
      error: 'No user could be found for that ID.'
    })

    res.status(200).json({
      success: true,
      user: user
    })
  })
};

module.exports.getWalks = function(req, res, next) {
  var id = req.params.userID;

  Walk.find({$or:[{owner: id}, {members: id}]}, function(error, walks) {
    if (error) return helper.mongooseValidationError(error, res);

    var walkDetails = [];
    
    walks.forEach(function(walk) {
      walkDetails.push({
        id: walk._id,
        name: walk.name,
        image: walk.image,
        createdAt: walk.createdAt
      });
    });

    return res.status(200).json({
      success: true,
      walks: walkDetails
    });
  });
};

module.exports.search = function(req, res, next) {
  var userInfo = new RegExp('^' + req.params.userInfo + '$', 'i');
  var fullNameTerms = req.params.userInfo.split(' ');
  var names = [];

  for (let key in fullNameTerms) {
    names[key] = new RegExp('^' + fullNameTerms[key] + '$', 'i');
  }

  User.find({$or:[{username: userInfo}, {'name.firstName': userInfo}, 
            {'name.lastName': userInfo}, {email: userInfo},
            {$and: [{'name.firstName': names[0]}, {'name.lastName': names[1]}]}]}, 
            function(error, users) {
    if (error) return helper.mongooseValidationError(error, res);

    var userDetails = [];

    users.forEach(function(user) {
      userDetails.push({
        id: user._id,
        username: user.username,
        email: user.email,
        name: {
          firstName: user.name.firstName,
          lastName: user.name.lastName
        }
      });
    });

    res.status(200).json({
      success: true,
      users: userDetails
    })
  });
};

module.exports.registerToken = function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {deviceToken: req.params.token}, {new: true}, function(error, user) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!user) return res.status(404).json({
      success: false,
      error: 'User does not exist.'
    })

    res.status(200).json({
      success: true,
      user: user
    })
  });
};

module.exports.invite = function(req, res, next) {
  var date, users;
  if (req.body.date) date = new Date(req.body.date);
  
  var userID = req.user._id;

  if (req.body.users) {
    users = JSON.parse(req.body.users);

    for (let key in users) {
      var user = users[key]

      if (userID.equals(user)) {
        return res.status(400).json({
          success: false,
          error: 'An invite cannot be sent to yourself.'
        })
      }

      User.findById(user, function(error, user) {
        if (error) return helper.mongooseValidationError(error, res);

        if (!user) return res.status(404).json({
                            success: false,
                            error: 'User does not exist.'
                          })

        if (key == users.length - 1) {
          var invite = new Invite({
            from: userID,
            to: users,
            date: date
          });

          invite.save(function(error) {
            if (error) return helper.mongooseValidationError(error, res);

            if (user.deviceToken) {
              var notification = new apn.Notification();
              notification.expiry = Math.floor(Date.now() / 1000) + 3600;
              notification.badge = 1;
              notification.sound = 'ping.aiff';
              notification.alert = req.user.name.firstName + ' ' + req.user.name.lastName + ' invited you to go on a walk';
              notification.topic = 'uk.ac.imperial.Amble';

              apnProvider.send(notification, user.deviceToken).then(function(result) {  
                  console.log(result);
              });
            } else {
              console.log('No device token');
            }

            res.status(200).json({
              success: true,
              invite: invite
            })
          });
        }
      });
    }
  }
};

module.exports.getSentInvites = function(req, res, next) {
  Invite.find({from: req.user._id})
        .populate('to')
        .exec(function(error, invites) {
          if (error) return helper.mongooseValidationError(error, res);

          res.status(200).json({
            success: true,
            invites: invites
          })
        });
};

module.exports.getReceivedInvites = function(req, res, next) {
  Invite.find({to: req.user._id})
        .populate('from')
        .exec(function(error, invites) {
          if (error) return helper.mongooseValidationError(error, res);

          res.status(200).json({
            success: true,
            invites: invites
          })
        });
};