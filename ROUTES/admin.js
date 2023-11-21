const express = require("express");
const router = express.Router();

const user_controllers = require(".././CONTROLLERS/user.controllers");
const util_controllers = require(".././CONTROLLERS/utils.controllers");
const middlewares = require(".././MIDDLEWARES/verification");

router.route("/login").post(user_controllers.login_user);

router.use(middlewares.verifyAdmin);

// UNHANDLES ROUTES
router.route("*").all(util_controllers.unhandleRoutes);

module.exports = router;
