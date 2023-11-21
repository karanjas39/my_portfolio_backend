const express = require("express");
const router = express.Router();

const user_controllers = require(".././CONTROLLERS/user.controllers");
const developer_controllers = require(".././CONTROLLERS/developer.controllers");
const util_controllers = require(".././CONTROLLERS/utils.controllers");
const middlewares = require(".././MIDDLEWARES/verification");

router.route("/login").post(user_controllers.login_user);

router.use(middlewares.verifyAdmin);

// DEVELOPER ROUTES
router
  .route("/developer/details")
  .get(developer_controllers.getDeveloperDetails);

router
  .route("/developer/update")
  .post(developer_controllers.updateDeveloperDetails);
// ROLES ROUTES

// UNHANDLES ROUTES
router.route("*").all(util_controllers.unhandleRoutes);

module.exports = router;
