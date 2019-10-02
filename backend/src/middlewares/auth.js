const config = require('config');
const jsonwebtoken = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const isAuthenticated = (req, res, next) => {
  const token = req.header('token');

  if (!token) return res.status(HttpStatus.UNAUTHORIZED).json({});

  try {
    jsonwebtoken.verify(token, config.get('secret'));
  } catch (err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({});
  }

  next();
};

module.exports = {
  isAuthenticated
};
