const express = require("express");
const router = express.Router();

const unhandledRoutes = require(".././UTILS/unhandledRoutes");
const user_controllers = require(".././CONTROLLERS/user.controllers");
const developer_controllers = require(".././CONTROLLERS/developer.controllers");
const role_controllers = require(".././CONTROLLERS/roles.controllers");
const skills_controllers = require(".././CONTROLLERS/skill.controllers");

const middlewares = require(".././MIDDLEWARES/verification");

router.route("/login").post(user_controllers.login_user);

router.use(middlewares.tokenVerification);

// DEVELOPER ROUTES
router
  .route("/developer/details")
  .get(developer_controllers.getDeveloperDetails);

router
  .route("/developer/update")
  .post(middlewares.verifyAdmin, developer_controllers.updateDeveloperDetails);

// ROLES ROUTES
router.route("/developer/role/all").get(role_controllers.allRoles);

router
  .route("/developer/role/add")
  .post(middlewares.verifyAdmin, role_controllers.createRole);

router
  .route("/developer/role/delete")
  .post(middlewares.verifyAdmin, role_controllers.deleteRole);

router
  .route("/developer/role/update")
  .post(middlewares.verifyAdmin, role_controllers.updateRole);

// SKILLS ROUTES
router.route("/developer/skill/all").get(skills_controllers.getAllSkills);

router
  .route("/developer/skill/add")
  .post(middlewares.verifyAdmin, skills_controllers.createSkill);

router
  .route("/developer/skill/delete")
  .post(middlewares.verifyAdmin, skills_controllers.deleteSkill);

router
  .route("/developer/skill/update")
  .post(middlewares.verifyAdmin, skills_controllers.updateSkill);

// UNHANDLES ROUTES
router.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = router;
