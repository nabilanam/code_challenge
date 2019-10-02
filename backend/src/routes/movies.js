const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const controller = require('../controllers/movie');
const middleware = require('../middlewares/auth');

router.get('/', middleware.isAuthenticated, (req, res) => {
  return controller
    .getMovies()
    .then(movies => res.status(HttpStatus.OK).json({ movies }))
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({}));
});

module.exports = router;
