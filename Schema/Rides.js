const mongoose = require('mongoose');
const User = require('./User');

const ridesSchema = mongoose.model({
  userType: {
    type: String,
    enum: ['Passenger', 'Driver'],
    required: [true, 'User Type is required'],
  },
  passengerRating: {
    type: Number,
    default: 0,
  },
  driverRating: {
    type: Number,
    default: 0,
  },
  passengerDetails: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  driverDetails: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

ridesSchema.statics.calAggregateRatings = async function (userType, userId) {
  const matchField =
    userType === 'Passenger' ? 'driverDetails' : 'passengerDetails';
  const matchFieldRatings =
    userType === 'Passenger' ? 'driverRating' : 'passengerRating';
  const aggregatedRatings = await this.aggregate([
    {
      $match: {
        [matchField]: { $eq: userId },
      },
    },
    {
      $group: {
        _id: null,
        totalRatings: {
          $sum: `$${matchFieldRatings}`,
        },
        averageRatings: {
          $avg: `$${matchFieldRatings}`,
        },
      },
    },
  ]);
  console.log('aggregatedRatings', aggregatedRatings);
  await User.findByIdAndUpdate(userId, {
    totalRatings: aggregatedRatings && aggregatedRatings[1],
  });
};

ridesSchema.post(/^find/, async function () {
  await this.constructor.calAggregateRatings(this.userType, this._id);
});

const Ride = mongoose.model('Ride', ridesSchema);

module.exports = Ride;
