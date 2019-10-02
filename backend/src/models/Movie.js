const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  year: {
    type: Number
  },
  rating: {
    type: Number
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor'
    }
  ]
});

module.exports = mongoose.model('Movie', schema);
