const Walk = require('../models/walk'),
      helper = require('./helper');

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
  
};