const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require(".././MODELS/user.model");
const constants = require("../UTILS/constants");

module.exports = { tokenVerification, verifyAdmin };

async function tokenVerification(req, res, next) {
  try {
    let { authorization } = req.headers;

    if (!authorization) {
      return res.send({
        success: false,
        status: 404,
        message: constants.tokenRequired,
      });
    }

    let decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.send({
        success: false,
        status: 400,
        message: constants.unauthorizedAccess,
      });
    }

    let isExpired = Date.now() >= decoded.exp * 1000;

    if (isExpired) {
      return res.send({
        success: false,
        status: 400,
        message: constants.tokenExpired,
      });
    }

    req.body.admin_id = decoded.admin_id;
    req.body.admin_password = decoded.admin_password;
    next();
  } catch (error) {
    res.send({
      success: false,
      status: 520,
      message: constants.unauthorizedAccess,
    });
  }
}

async function verifyAdmin(req, res, next) {
  try {
    let { admin_id, admin_password } = req.body;
    let invalidFields = [];
    if (!admin_id) {
      invalidFields.push("admin_id");
    }
    if (!admin_password) {
      invalidFields.push("admin_password");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isAdmin = await User.findOne({ _id: admin_id });

    if (!isAdmin) {
      return res.send({
        success: false,
        status: 400,
        message: constants.invalidCreds,
      });
    }

    let isPassword = bcrypt.compareSync(admin_password, isAdmin.password);

    if (!isPassword) {
      return res.send({
        success: false,
        status: 400,
        message: constants.invalidCreds,
      });
    }

    if (isAdmin.admin != true) {
      return res.send({
        success: false,
        status: 400,
        message: constants.unauthorizedAccess,
      });
    }

    next();
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: constants.unauthorizedAccess,
    });
  }
}
