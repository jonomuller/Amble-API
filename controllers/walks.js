const Walk = require('../models/walk');

module.exports.create = function(req, res, next) {
  var name = req.body.name;
  var owner = req.body.owner;
  var coordinates = req.body.coordinates;

  var required = {
    "name": name,
    "owner": owner,
    "coordinates": coordinates
  };

  for (let key in required) {
    var value = required[key];
    if (!value) return res.status(400).json({
                         success: false,
                         error: `Please enter the ${key}.`
                       })
  }

  coordinates = JSON.parse(coordinates);

  var walk = new Walk({
    name,
    owner,
    geometry: {
      type: 'MultiPoint',
      coordinates: coordinates
    }
  });

  walk.save(function(error) {
    if (error) return next(error);
    res.status(201).json({
      success: true,
      walk: walk
    });
  });
};

module.exports.getWalk = function(req, res, next) {
  var id = req.params.walkID;

  Walk.findById(id, function(error, walk) {
    if (error) {
      if (error.name == "CastError") return res.status(400).json({
                                              success: false,
                                              error: 'Please enter a valid ID.'
                                            });
      return next(error);
    }

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