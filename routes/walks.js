const express = require('express'),
      walksRouter = express.Router(),
      walks = require('../controllers/walks'),
      helper = require('./helper'),
      config = require('../config/config'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      aws = require('aws-sdk'),
      s3 = new aws.S3();

s3.config.update({
  signatureVersion: 'v4',
  accessKeyId: config.awsAccessKeyID,
  secretAccessKey: config.awsSecretAccessKey
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.awsBucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png')
    }
  })
})

walksRouter.post('/create', helper.jwtAuth, upload.single('map'), walks.create);
walksRouter.get('/:walkID', helper.jwtAuth, walks.getWalk);

module.exports = walksRouter;