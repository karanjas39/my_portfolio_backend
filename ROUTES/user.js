const express = require("express");
const router = express.Router();

const unhandledRoutes = require(".././UTILS/unhandledRoutes");
const developer_controllers = require(".././CONTROLLERS/developer.controllers");
const role_controllers = require(".././CONTROLLERS/roles.controllers");
const skills_controllers = require(".././CONTROLLERS/skill.controllers");
const experience_controllers = require(".././CONTROLLERS/experience.controllers");
const edu_controllers = require(".././CONTROLLERS/education.controllers");
const project_controllers = require(".././CONTROLLERS/project.controllers");

const middlewares = require(".././MIDDLEWARES/user.middleware");

router.use(middlewares.getUrlAndInjectCode);

// DEVELOPER ROUTES
router
  .route("/developer/details")
  .get(developer_controllers.getDeveloperDetails);

// ROLES ROUTES
router.route("/developer/role/all").get(role_controllers.allRoles);

// SKILLS ROUTES
router.route("/developer/skill/all").get(skills_controllers.getAllSkills);

// EXPERIENCE ROUTES
router
  .route("/developer/experience/all")
  .get(experience_controllers.getAllExperience);

// EDUCATION ROUTES
router.route("/developer/education/all").get(edu_controllers.getAllEducation);

// PROJECT ROUTES
router.route("/developer/project/all").get(project_controllers.getAllProject);
router
  .route("/developer/project/search")
  .get(project_controllers.searchProject);

router.route("/developer/project/one").get(project_controllers.getProject);

// UNHANDLES ROUTES
router.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = router;
