const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const controller = require('../controllers/actor');

router.get('/', (req, res) => {
  return controller
    .getActors()
    .then(actors => res.status(HttpStatus.OK).json({ actors }))
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({}));
});

module.exports = router;
