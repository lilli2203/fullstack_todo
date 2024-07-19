const express = require("express");

const {
  loginHandler,
  signupHandler,
  refreshHandler,
} = require("../controllers/auth");
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginHandler);

router.post("/refresh", checkAuth, refreshHandler);

router.post("/signup", signupHandler);

module.exports = router;
