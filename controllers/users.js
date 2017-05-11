const Walk = require('../models/walk'),
      User = require('../models/user'),
      Invite = require('../models/invite'),
      helper = require('./helper'),
      config = require('../config/config'),
      apn = require('apn');

var apnProvider = new apn.Provider({  
     token: {
        key: config.apnsPrivateKey, // Path to the key p8 file
        keyId: '27U39CG6UZ', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
        teamId: 'QJQGH9NF7F', // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: false // Set to true if sending a notification to a production iOS app
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

  Walk.find({owner: id}, function(error, walks) {
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
  User.findByIdAndUpdate(req.params.userID, {deviceToken: req.params.token}, {new: true}, function(error, user) {
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
  var date;
  if (req.body.date) date = new Date(req.body.date);

console.log(config.apnsPrivateKey);
  var userID = req.params.userID;

  User.findById(userID, function(error, user) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!user) return res.status(404).json({
                        success: false,
                        error: 'User does not exist.'
                      })

    var invite = new Invite({
      from: req.body.from,
      to: userID,
      date: date
    });

    invite.save(function(error) {
      if (error) return helper.mongooseValidationError(error, res);

      if (user.deviceToken) {
        var notification = new apn.Notification();
        notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        notification.badge = 1;
        notification.sound = 'ping.aiff';
        notification.alert = user.name.firstName + ' ' + user.name.lastName + ' invited you to go on a walk';
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
  });
};