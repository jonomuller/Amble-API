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
    res.status(200).json({
      success: true,
      walk: walk
    });
  });
};