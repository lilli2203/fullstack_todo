// Handling better errors for dev and prod environment

const sendDevError = (err, res) => {};

const sendProdError = (err, res) => {};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({ status: err.status, message: err.message });
};
