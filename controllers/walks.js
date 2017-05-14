const Walk = require('../models/walk'),
      User = require('../models/user'),
      Achievement = require('../models/point'),
      helper = require('./helper'),
      config = require('../config/config'),
      aws = require('aws-sdk'),
      s3 = new aws.S3();

s3.config.update({
  region: config.awsRegion,
  signatureVersion: 'v4',
  accessKeyId: config.awsAccessKeyID,
  secretAccessKey: config.awsSecretAccessKey
})

// Object defined as an enum to list possible achievement types
// Object.freeze prevents object from changing
const AchievementTypes = Object.freeze({
  DISTANCE: 1,
  DAY_STREAK: 2,
  GROUP: 3
})

function isValidAchievement(achievement) {
  for (let key in AchievementTypes) {
    if (achievement == key) {
      return true
    }
  }

  return false
}

module.exports.create = function(req, res, next) {
  var userID = req.user._id;
  var coordinates, members;
  if (req.body.coordinates) coordinates = JSON.parse(req.body.coordinates);

  // Check all members are valid users
  if (req.body.members) {
    members = JSON.parse(req.body.members);

    for (let key in members) {
      let member = members[key];

      if (userID.equals(member)) return res.status(400).json({
        success: false,
        error: 'One of the members cannot be your own user ID.'
      })

      User.findById(member, function(error, user) {
        if (error) return helper.mongooseValidationError(error, res);

        if (!user) return res.status(404).json({
          success: false,
          error: 'Member `' + member + '` does not exist.'
        })
      });
    }
  }

  var achievementSchemas = [];
  var score = 0;

  if (req.body.achievements) {
    var achievements = JSON.parse(req.body.achievements);

    for (let key in achievements) {
      var a = achievements[key];

      if (!isValidAchievement(a.name.toUpperCase())) 
        return res.status(400).json({
          success: false,
          error: '`' + a.name + '` is an invalid achievement type.'
        });

      var achievement = new Achievement({
        name: a.name,
        value: a.value
      })

      score += a.value;
      achievementSchemas.push(achievement);
    }
  }

  var distance = req.body.distance;
  var steps = req.body.steps;

  var walk = new Walk({
    name: req.body.name,
    owner: userID,
    members: members,
    geometry: {
      type: 'MultiPoint',
      coordinates: coordinates
    },
    achievements: achievementSchemas,
    image: req.body.image,
    time: req.body.time,
    distance: distance,
    steps: steps
  });

  walk.save(function(error) {
    if (error) return helper.mongooseValidationError(error, res);
    
    User.findByIdAndUpdate(walk.owner, {$inc: {score: score, distance: distance, steps: steps}}, function(error, user) {
      if (error) return helper.mongooseValidationError(error, res);

      if (!user) return res.status(404).json({
        success: false,
        error: 'The owner specified for the walk is not a valid user.'
      })

      res.status(201).json({
        success: true,
        walk: walk
      });
    });
  });
};

module.exports.getMapImageURL = function(req, res, next) {
  var params = {
    Bucket: config.awsBucket,
    Key: Date.now().toString() + '.jpg',
    ACL: 'public-read',
    ContentType: 'image/jpeg',
    Expires: 60
  }

  s3.getSignedUrl('putObject', params, function(error, url) {
    if (error) return res.status(500).json({
      success: false,
      error: 'Unable to generate signed URL for AWS.'
    })

    res.status(200).json({
      success: true,
      url: url
    })
  });
};

module.exports.getWalk = function(req, res, next) {
  var id = req.params.walkID;

  Walk.findById(id, function(error, walk) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!walk) return res.status(404).json({
                        success: false,
                        error: 'No walk with that ID can be found.'
                      })

    return res.status(200).json({
             success: true,
             walk: walk
           });
  });
};

module.exports.deleteWalk = function(req, res, next) {
  Walk.findByIdAndRemove(req.params.walkID, function(error, walk) {
    if (error) return helper.mongooseValidationError(error, res)

    if (!walk) return res.status(404).json({
      success: false,
      error: 'No walk with that ID can be found.'
    })

    var components = walk.image.split('/');
    var imageKey = components[components.length - 1];
    console.log(imageKey);

    var params = {
      Bucket: config.awsBucket,
      Key: imageKey
    }

    s3.deleteObject(params, function(error, data) {
      if (error || !data) return res.status(500).json({
        success: false,
        error: 'Image could not be deleted.'
      })
      
      res.status(200).json({
        success: true
      })
    });
  });
}