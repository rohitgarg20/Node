const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './server.js',
});

mongoose
  .connect(process.env.connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('err'));


app.listen(process.env.PORT, () => {
  console.log('successfully connected to the port');
});
