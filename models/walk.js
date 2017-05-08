const mongoose = require('mongoose'),
      geoJSON = require('mongoose-geojson-schema'),
      Schema = mongoose.Schema,
      Point = require('./point'),
      PointSchema = mongoose.model('Point').schema;

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
  geometry: {
    type: Schema.Types.MultiPoint,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  points: [PointSchema],
  time: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Walk', WalkSchema);