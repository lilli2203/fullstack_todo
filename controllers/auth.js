const jwt = require("jsonwebtoken");
const User = require("./../db/User.js");

const signToken = (id) => {
  return jwt.sign({ id }, "SECRETKEY", { expiresIn: "1h" });
};

exports.loginHandler = async (req, res) => {
  console.log("Hitting the backend login route C1");
  const email = req.body.email;
  const password = req.body.password;

  if (!email && !password) {
    // throw an app error
  }

  const user = await User.findOne({ email });
  // const user = await User.findOne({ email }).select("+passsword");

  // if (!user || !(password === user.password)) {
  //   return; // later with the correct passowrd method
  // }

  const token = signToken(user._id);
  console.log("Hitting the backend login route C2");

  res.status(200).json({
    status: "success",
    message: "User logged In",
    token,
    data: {
      user,
    },
  });
};

exports.signupHandler = async (req, res) => {
  const { email, name, password, confrimPassword } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confrimPassword,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    message: "New user created",
    token,
    data: {
      user: newUser,
    },
  });
};

// need to implmemnt this
exports.refreshHandler = async (req, res) => {
  // We have the id here
};

// need to implment this
exports.socialAuthHandler = async (req, res) => {};
