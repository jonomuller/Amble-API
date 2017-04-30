const express = require('express'),
      walksRouter = express.Router(),
      walks = require('../controllers/walks'),
      helper = require('./helper');

walksRouter.post('/create', helper.jwtAuth, walks.create);
walksRouter.get('/create/upload', helper.jwtAuth, walks.uploadMapImage);
walksRouter.get('/:walkID', helper.jwtAuth, walks.getWalk);

module.exports = walksRouter;