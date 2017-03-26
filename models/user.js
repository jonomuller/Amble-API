const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema(),
      SALT_ROUNDS = 12;

const UserSchema = new Schema({
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
    unique: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

// Encrypt password when created or modified
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_ROUNDS, function(error, hash) {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  }
});


module.exports = mongoose.model('User', UserSchema);