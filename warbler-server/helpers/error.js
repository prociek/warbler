const errorHandler = (err, req, res, next) => res.status(err.status || 500)
  .json({error: {message: err.message || 'Something went wrong!'}});

module.exports = errorHandler;