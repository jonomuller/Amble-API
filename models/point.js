const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var PointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = PointSchema;