const { customError } = require("../error/CustomError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json(err.message);
  }

  return res.status(500).send("Something went wrong");
};

module.exports = errorHandler;
