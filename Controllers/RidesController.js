const Ride = require('../Schema/Rides');

const updateRideRatings = async (req, res, next) => {
  const { currentUser } = req;
  const { rideId } = req.params;
  const { ratings } = req.body;

  const { userType } = currentUser;
  let ratingsData;
  if (userType === 'Passenger') {
    ratingsData = { driverRating: ratings };
  } else {
    ratingsData = { passengerRating: ratings };
  }

  const updatedRideDetail = await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      ratingsData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'Success',
    message: 'ratings updated Successfully',
    data: {
      ride: updatedRideDetail,
    },
  });
};

module.exports = {
  updateRideRatings: updateRideRatings,
};
