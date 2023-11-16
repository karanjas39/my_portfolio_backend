const express = require("express");
const router = express.Router();

const user_controllers = require(".././CONTROLLERS/user.controllers");

router.route("/login").post(user_controllers.login_user);

module.exports = router;
