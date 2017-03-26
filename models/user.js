const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema();

const User = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },

  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('User', User);