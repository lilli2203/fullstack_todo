const jwt = require("jsonwebtoken");
const User = require("./../db/User.js");

const signToken = (id) => {
  return jwt.sign({ id }, "SECRETKEY", { expiresIn: "1h" });
};

exports.loginHandler = async (req, res) => {
  console.log("Hitting the backend login route C1");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password"
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password"
    });
  }

  const token = signToken(user._id);
  console.log("Hitting the backend login route C2");

  res.status(200).json({
    status: "success",
    message: "User logged in",
    token,
    data: {
      user
    }
  });
};

// Signup handler
exports.signupHandler = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match"
    });
  }

  const newUser = await User.create({
    name,
    email,
    password
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    message: "New user created",
    token,
    data: {
      user: newUser
    }
  });
};

exports.refreshHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        status: "fail",
        message: "No refresh token provided"
      });
    }

    const decoded = jwt.verify(refreshToken, "REFRESHSECRETKEY");
    const newToken = signToken(decoded.id);

    res.status(200).json({
      status: "success",
      token: newToken
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Invalid refresh token"
    });
  }
};

exports.socialAuthHandler = async (req, res) => {
  try {
    const { provider, token } = req.body;

    const socialUser = await verifySocialToken(provider, token);

    let user = await User.findOne({ email: socialUser.email });
    if (!user) {
      user = await User.create({
        name: socialUser.name,
        email: socialUser.email,
        password: socialUser.id
      });
    }

    const jwtToken = signToken(user._id);

    res.status(200).json({
      status: "success",
      token: jwtToken,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Social authentication failed"
    });
  }
};

const verifySocialToken = async (provider, token) => {
  return {
    id: "social123",
    name: "Social User",
    email: "socialuser@example.com"
  };
};
