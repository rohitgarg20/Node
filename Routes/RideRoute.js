const express = require('express');
const { updateRideRatings } = require('../Controllers/RidesController');

const rideRouter = express.Router();

// first we need to authenticate the user. This route will be a protected route.

rideRouter.route('/:rideId/ratings').update(updateRideRatings);

module.exports = rideRouter;
