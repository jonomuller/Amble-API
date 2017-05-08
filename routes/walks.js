const express = require('express'),
      walksRouter = express.Router(),
      walks = require('../controllers/walks'),
      helper = require('./helper');

walksRouter.post('/create', walks.create);
walksRouter.get('/create/upload', helper.jwtAuth, walks.getMapImageURL);
walksRouter.get('/:walkID', helper.jwtAuth, walks.getWalk);
walksRouter.delete('/:walkID', helper.jwtAuth, walks.deleteWalk);

module.exports = walksRouter;