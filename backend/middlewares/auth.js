const jwt = require('jsonwebtoken');
// const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const ANAUTHORUZED_ERROR = 401;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return next(new AuthorizationError('Авторизация не пройдена'));
    return res
      .status(ANAUTHORUZED_ERROR)
      .send({ message: 'Аторизируйтесь' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // throw new AuthorizationError('Авторизация не пройдена');
    return res
      .status(ANAUTHORUZED_ERROR)
      .send({ message: 'Пользователь не авторизован' });
  }
  req.user = payload;
  return next();
};
