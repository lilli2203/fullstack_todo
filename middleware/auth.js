const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./utils/appError");
const User = require("./../db/User"); 

const extractToken = (req) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  return token;
};

const checkAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, "SECRETKEY");

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User recently changed password! Please log in again.', 401));
    }

    req.user = currentUser;
    req.id = decoded.id;
    next();
  } catch (err) {
    return next(new AppError('Authentication failed. Please log in again.', 401));
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, "SECRETKEY", { expiresIn: "1h" });
};

const protectedRoute = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You are not authenticated to access this route', 403));
  }
  res.status(200).json({
    status: 'success',
    message: 'You have accessed a protected route',
  });
};

const generateToken = (req, res) => {
  const id = req.body.id || "sampleUserId";
  const token = signToken(id);
  res.status(200).json({
    status: 'success',
    token
  });
};

module.exports = {
  checkAuth,
  protectedRoute,
  generateToken,
  signToken
};
