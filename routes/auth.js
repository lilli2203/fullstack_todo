const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  loginHandler,
  signupHandler,
  refreshHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  updateProfileHandler,
  deleteUserHandler
} = require("../controllers/auth");
const checkAuth = require("../middleware/auth");
const validate = require("../middleware/validate");


const router = express.Router();


const signupValidation = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
  body('name').notEmpty().withMessage('Name is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Must be a valid email address')
];

const resetPasswordValidation = [
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match')
];

const updateProfileValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Must be a valid email address')
];


router.post("/login", loginValidation, validate, loginHandler);


router.post("/refresh", checkAuth, refreshHandler);


router.post("/signup", signupValidation, validate, signupHandler);


router.post("/forgot-password", forgotPasswordValidation, validate, forgotPasswordHandler);


router.post("/reset-password/:token", resetPasswordValidation, validate, resetPasswordHandler);


router.get("/verify-email/:token", verifyEmailHandler);


router.patch("/update-profile", checkAuth, updateProfileValidation, validate, updateProfileHandler);


router.delete("/delete-account", checkAuth, deleteUserHandler);

router.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'fail',
      errors: err.errors
    });
  }
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = router;
