const User = require(".././MODELS/user.model");
const constants = require("../UTILS/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOTP = require("../UTILS/generateOTP");

module.exports = { login_user, changePassword, confirmOtpAndChangePassword };

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

    let token = jwt.sign({ admin_id: isUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({
      success: true,
      status: 200,
      token,
      id: isUser._id,
      path: "../HTML/admin.html",
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in login_user`);
  }
}

async function changePassword(req, res) {
  try {
    let { _id, prevPassword } = req.body;
    let invalidFields = [];
    if (!_id) {
      invalidFields.push("id");
    }
    if (!prevPassword) {
      invalidFields.push("old password");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isUser = await User.findOne({ _id });

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidCreds,
      });
    }

    let isPassword = bcrypt.compareSync(prevPassword, isUser.password);

    if (!isPassword) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidCreds,
      });
    }

    let isOTPGenerated = await generateOTP(_id);

    if (!isOTPGenerated.isEmailSend.success) {
      return res.send({
        success: false,
        status: 400,
        message: constants.chnagePassOtpNotSent,
      });
    }

    await User.updateOne(
      { _id },
      { otp: isOTPGenerated.otp, otpCreatedAt: Date.now() }
    );

    return res.send({
      success: true,
      status: 200,
      message: constants.chnagePasswordOtpSent,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in changePassword`,
    });
  }
}

async function confirmOtpAndChangePassword(req, res) {
  try {
    let { _id, newPassword, otp } = req.body;
    let timeNow = Date.now();
    let invalidFields = [];
    if (!_id) {
      invalidFields.push("id");
    }
    if (!newPassword) {
      invalidFields.push("new password");
    }
    if (!otp) {
      invalidFields.push("otp");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isUser = await User.findOne({ _id });

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidCreds,
      });
    }
    if (otp != isUser.otp) {
      isUser.otp = "";
      isUser.otpCreatedAt = null;
      await isUser.save();
      return res.send({
        success: false,
        status: 400,
        message: "Entered OTP is incorrect.",
      });
    }

    if (timeNow > isUser.otpCreatedAt + 1 * 60 * 1000) {
      isUser.otp = "";
      isUser.otpCreatedAt = null;
      await isUser.save();
      return res.send({
        success: false,
        status: 400,
        message: "OTP has expired. Please request a new one.",
      });
    }

    await User.updateOne(
      { _id },
      { password: bcrypt.hashSync(newPassword, 10), updatedAt: Date.now() }
    );

    isUser.otp = "";
    isUser.otpCreatedAt = null;
    await isUser.save();

    res.send({
      success: true,
      status: 200,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in confirmOtpAndChangePassword`,
    });
  }
}
