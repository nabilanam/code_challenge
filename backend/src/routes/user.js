const router = require('express').Router();
const controller = require('../controllers/user');
const HttpStatus = require('http-status-codes');

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  return controller
    .createUser(username, password)
    .then(token => res.status(HttpStatus.CREATED).json({ token }))
    .catch(err => {
      if (err.message === 'DUPLICATE')
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ error: 'Username already taken' });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  return controller
    .getLoginToken(username, password)
    .then(token => res.status(HttpStatus.OK).json({ token }))
    .catch(() =>
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid username or password' })
    );
});

module.exports = router;
