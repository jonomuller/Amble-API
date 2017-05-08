const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const PointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Point', PointSchema);