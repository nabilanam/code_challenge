const config = require('config');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');

const getJWTToken = id => {
  return jsonwebtoken.sign({ id }, config.get('secret'), {
    expiresIn: config.get('tokenExpiry')
  });
};

const createUser = (username, password) => {
  return bcrypt.hash(password, 10).then(hash => {
    return new User({
      username,
      password: hash
    })
      .save()
      .then(user => getJWTToken(user.id));
  });
};

const getLoginToken = (username, password) => {
  return User.findOne({ username }).then(user => {
    return bcrypt.compare(password, user.password).then(res => {
      if (!res) throw new Error();
      return getJWTToken(user.id);
    });
  });
};

module.exports = {
  createUser,
  getLoginToken
};
