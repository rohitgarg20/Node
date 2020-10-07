const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    lower: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
    enum: ['Passenger', 'Driver'],
    required: [true, 'User Type is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
