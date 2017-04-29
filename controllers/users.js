const Walk = require('../models/walk'),
      helper = require('./helper');

module.exports.getWalks = function(req, res, next) {
  var id = req.params.userID;
  
  Walk.find({owner: id}, function(error, walks) {
    if (error) return helper.mongooseValidationError(error, res);

    return res.status(200).json({
      success: true,
      walks: walks
    });
  });
};