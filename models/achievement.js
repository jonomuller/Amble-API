const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var AchievementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
},
{
  noId: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);