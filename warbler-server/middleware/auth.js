const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (payload) {
        return next();
      } else {
        return next({ status: 401, message: "Please Login first!" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Please Login first!" });
  }
};

exports.authorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (payload && payload.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized!" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Unauthorized!" });
  }
};
