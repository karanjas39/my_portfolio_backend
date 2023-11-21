const jwt = require("jsonwebtoken");
const User = require("../MODELS/user.model");
const constants = require("../CONTROLLERS/constants");

module.exports = { verifyAdmin };

async function verifyAdmin(req, res, next) {
  try {
    let { authorization } = req.headers;

    if (!authorization) {
      res.send({
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

    let isExpired =
      Number(decoded.iat) + 60 * 60 <= Math.floor(Date.now() / 1000);

    if (isExpired) {
      return res.send({
        success: false,
        status: 400,
        message: constants.tokenExpired,
      });
    }

    let isUser = await User.findOne({ admin: true });

    if (!isUser._id.equals(decoded._id)) {
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
