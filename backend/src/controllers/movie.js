const Movie = require('../models/Movie');

const getMovies = () => {
  return Movie.find({}).populate('actors');
};

module.exports = {
  getMovies
};
