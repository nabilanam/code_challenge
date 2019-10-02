const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  birthday: {
    type: Date
  },
  country: {
    type: String
  }
});

module.exports = mongoose.model('Actor', schema);
