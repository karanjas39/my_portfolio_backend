const express = require("express");
const router = express.Router();

const unhandledRoutes = require(".././UTILS/unhandledRoutes");
const user_controllers = require(".././CONTROLLERS/user.controllers");
const developer_controllers = require(".././CONTROLLERS/developer.controllers");
const role_controllers = require(".././CONTROLLERS/roles.controllers");
const skills_controllers = require(".././CONTROLLERS/skill.controllers");
const experience_controllers = require(".././CONTROLLERS/experience.controllers");
const edu_controllers = require(".././CONTROLLERS/education.controllers");
const project_controllers = require(".././CONTROLLERS/project.controllers");

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

// EXPERIENCE ROUTES
router
  .route("/developer/experience/all")
  .get(experience_controllers.getAllExperience);
router
  .route("/developer/experience/add")
  .post(middlewares.verifyAdmin, experience_controllers.createExperience);
router
  .route("/developer/experience/update")
  .post(middlewares.verifyAdmin, experience_controllers.updateExperience);
router
  .route("/developer/experience/delete")
  .post(middlewares.verifyAdmin, experience_controllers.deleteExperience);

// EDUCATION ROUTES
router.route("/developer/education/all").get(edu_controllers.getAllEducation);
router
  .route("/developer/education/add")
  .post(middlewares.verifyAdmin, edu_controllers.createEducation);
router
  .route("/developer/education/update")
  .post(middlewares.verifyAdmin, edu_controllers.updateEducation);
router
  .route("/developer/education/delete")
  .post(middlewares.verifyAdmin, edu_controllers.deleteEducation);

// PROJECT ROUTES
router.route("/developer/project/all").post(project_controllers.getAllProject);
router
  .route("/developer/project/search")
  .post(project_controllers.searchProject);
router.route("/developer/project/one").post(project_controllers.getProject);
router
  .route("/developer/project/add")
  .post(middlewares.verifyAdmin, project_controllers.createProject);
router
  .route("/developer/project/delete")
  .post(middlewares.verifyAdmin, project_controllers.deleteProject);
router
  .route("/developer/project/update")
  .post(middlewares.verifyAdmin, project_controllers.updateProject);

// PROJECT LINKS ROUTES
router
  .route("/developer/project/add/link")
  .post(middlewares.verifyAdmin, project_controllers.createProjectLinks);
router
  .route("/developer/project/update/link")
  .post(middlewares.verifyAdmin, project_controllers.updateProjectLinks);
router
  .route("/developer/project/delete/link")
  .post(middlewares.verifyAdmin, project_controllers.deleteProjectLinks);

// PROJECT TECH STACK ROUTES
router
  .route("/developer/project/add/tech")
  .post(middlewares.verifyAdmin, project_controllers.createProjectTech);
router
  .route("/developer/project/delete/tech")
  .post(middlewares.verifyAdmin, project_controllers.deleteProjectTech);

// UNHANDLES ROUTES
router.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = router;
