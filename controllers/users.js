const Walk = require('../models/walk'),
      User = require('../models/user'),
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
  var userInfo = new RegExp('^' + req.params.userInfo + '$', 'i');
  
  User.findOne({$or:[{'username': userInfo}, {'name.firstName': userInfo}, {'name.lastName': userInfo}]}, function(error, user) {
    if (error) return helper.mongooseValidationError(error, res);

    if (!user) return res.status(404).json({
                        success: false,
                        error: 'No users could be found.'
                      });

    res.status(200).json({
      success: true,
      user: user
    })
  });
};