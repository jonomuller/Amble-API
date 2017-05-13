const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      Schema = mongoose.Schema,
      SALT_ROUNDS = 10;

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
  },
  deviceToken: String,
  score: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0
  },
  steps: {
    type: Number,
    default: 0
  }
});

// Encrypt password when created or modified
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_ROUNDS, function(error, hash) {
    if (error) return next(error);
    user.password = hash;
    next();
  });
});

// Compare passwords when user logs in
UserSchema.methods.comparePassword = function(newPassword, callback) {
  bcrypt.compare(newPassword, this.password, function(error, success) {
    if (error) return callback(error);
    callback(null, success);
  });
};

module.exports = mongoose.model('User', UserSchema);