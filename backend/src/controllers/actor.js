const Actor = require('../models/Actor');

const getActors = () => {
  return Actor.find({});
};

module.exports = {
  getActors
};
