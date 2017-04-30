const Walk = require('../models/walk'),
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

module.exports.create = function(req, res, next) {
  var coordinates;
  if (req.body.coordinates) coordinates = JSON.parse(req.body.coordinates);

  var walk = new Walk({
    name: req.body.name,
    owner: req.body.owner,
    geometry: {
      type: 'MultiPoint',
      coordinates: coordinates
    },
    image: req.body.image,
    time: req.body.time,
    distance: req.body.distance,
    steps: req.body.steps
  });

  walk.save(function(error) {
    if (error) return helper.mongooseValidationError(error, res);
    
    res.status(201).json({
      success: true,
      walk: walk
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