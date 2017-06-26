const mongoose = require('mongoose'),
      geoJSON = require('mongoose-geojson-schema'),
      Schema = mongoose.Schema,
      Achievement = require('./achievement'),
      AchievementSchema = mongoose.model('Achievement').schema;

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
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  geometry: {
    type: Schema.Types.MultiPoint,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  achievements: [AchievementSchema],
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