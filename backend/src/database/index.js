const mongoose = require('mongoose');
const config = require('config');

const connect = () =>
  mongoose
    .connect(config.get('database'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .catch(() => {
      console.log('Database connection error');
      process.exit(1);
    });

module.exports = { connect };
