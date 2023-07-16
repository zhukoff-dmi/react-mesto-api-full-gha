module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: err.message });
    next();
  }
};
