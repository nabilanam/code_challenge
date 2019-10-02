const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('DUPLICATE'));
  } else next();
});

module.exports = mongoose.model('User', schema);
