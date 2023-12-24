const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.find({ email: email });

    if (existUser.length) {
      return res.status(200).send({ message: "User already exists" });
    }
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ message: "new user created!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.find({
      email: email,
      password: password,
    });
    if (!loginUser.length) {
      return res.status(500).send({ message: "Invalid username or password" });
    }

    const access_token = jwt.sign(
      { _id: loginUser[0]._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );
    const refresh_token = jwt.sign(
      { _id: loginUser[0]._id },
      process.env.JWT_REFRESH_TOKEN
    );

    res.cookie("access_token", access_token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.cookie("refresh_token", refresh_token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).send({
      message: "user login successfully!",
      token: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.cookie_token = async (req, res) => {
  try {
    const { access_token, refresh_token } = req.cookies;
    if (!access_token && !refresh_token) {
      return res.status(403).send({ message: "token not found!" });
    }

    res.status(200).send({
      message: "token fetched!",
      token: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/" });
    res.status(200).send({ message: "user logout" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN);
    const user = decoded._id;

    const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    res.cookie("access_token", newAccessToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).send({
      message: "refresh token applied!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
