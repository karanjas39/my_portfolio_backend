const User = require(".././MODELS/user.model");
const constants = require("./constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = { login_user };

async function login_user(req, res) {
  try {
    let { username, password } = req.body;
    let invalidFields = [];
    if (!username) {
      invalidFields.push("username");
    }

    if (!password) {
      invalidFields.push("password");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isUser = await User.findOne({ username });

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidCreds,
      });
    }

    let isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidCreds,
      });
    }

    let token = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({
      success: true,
      status: 200,
      token,
      path: "./admin.html",
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in login_user`);
  }
}
