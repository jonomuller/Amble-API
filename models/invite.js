const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const InviteSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accepted: {
      type: Boolean,
      required: true
    }
  }],
  date: {
    type: Date,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Invite', InviteSchema);