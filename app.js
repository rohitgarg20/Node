const express = require('express');
const rideRouter = require('./Routes/RideRoute');

const app = express();

app.use(express.json());

app.use('/api/v1/rides', rideRouter);

app.use((err, req, res, next) => {
  res.status(400).json({
    status: 'failure',
    err,
  });
});

module.exports = app;
