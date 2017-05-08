const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const StatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  score: {
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
});

module.exports = mongoose.model('Stat', StatSchema);