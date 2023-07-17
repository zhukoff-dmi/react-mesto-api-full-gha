const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const validation = require('../middlewares/validation');

router.post('/signin', validation.login, login);
router.post('/signup', validation.createUser, createUser);

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
