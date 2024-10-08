const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      profilePic: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('User', UserSchema);