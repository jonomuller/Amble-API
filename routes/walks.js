const express = require('express'),
      walksRouter = express.Router(),
      walks = require('../controllers/walks');

walksRouter.post('/create', walks.create);

module.exports = walksRouter;