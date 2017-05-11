const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const InviteSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Invite', InviteSchema);