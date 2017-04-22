const mongoose = require('mongoose'),
      geoJSON = require('mongoose-geojson-schema'),
      Schema = mongoose.Schema;

const WalkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  geometry: Schema.Types.MultiPoint
});

module.exports = mongoose.model('Walk', WalkSchema);