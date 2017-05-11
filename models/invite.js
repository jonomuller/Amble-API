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
    required: true
  }
});

module.exports = mongoose.model('Invite', InviteSchema);