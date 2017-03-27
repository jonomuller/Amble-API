const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const WalkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // unsure if this is correct way of storing a walk
  waypoints: [{
    type: [Number],
    index: '2d'
  }]
});

module.exports = mongoose.model('Walk', WalkSchema);