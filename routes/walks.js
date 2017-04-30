const express = require('express'),
      walksRouter = express.Router(),
      walks = require('../controllers/walks'),
      helper = require('./helper'),
      multer = require('multer');

walksRouter.post('/create', helper.jwtAuth, multer().single('map'), walks.create);
walksRouter.get('/:walkID', helper.jwtAuth, walks.getWalk);

module.exports = walksRouter;