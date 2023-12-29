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
const socialMedia_controllers = require(".././CONTROLLERS/socialMedia.controller");
const contributionRequest_controllers = require(".././CONTROLLERS/contributionRequest.controllers");
const sendEmail_controller = require(".././UTILS/sendEmail");

const upload = require(".././UTILS/fileUpload");

const middlewares = require(".././MIDDLEWARES/verification");

router.route("/login").post(user_controllers.login_user);

router.use(middlewares.tokenVerification);

// DEVELOPER ROUTES
router.route("/details").get(developer_controllers.getDeveloperDetails);

router
  .route("/update")
  .post(middlewares.verifyAdmin, developer_controllers.updateDeveloperDetails);

router
  .route("/cv/upload")
  .post(upload.single("cv"), developer_controllers.uploadDeveloperCV);

// ROLES ROUTES
router.route("/role/all").get(role_controllers.allRoles);

router
  .route("/role/add")
  .post(middlewares.verifyAdmin, role_controllers.createRole);

router
  .route("/role/delete")
  .post(middlewares.verifyAdmin, role_controllers.deleteRole);

router
  .route("/role/update")
  .post(middlewares.verifyAdmin, role_controllers.updateRole);

// SKILLS ROUTES
router.route("/skill/all").get(skills_controllers.getAllSkills);

router
  .route("/skill/add")
  .post(middlewares.verifyAdmin, skills_controllers.createSkill);

router
  .route("/skill/delete")
  .post(middlewares.verifyAdmin, skills_controllers.deleteSkill);

router
  .route("/skill/update")
  .post(middlewares.verifyAdmin, skills_controllers.updateSkill);

// EXPERIENCE ROUTES
router.route("/experience/all").get(experience_controllers.getAllExperience);
router
  .route("/experience/add")
  .post(middlewares.verifyAdmin, experience_controllers.createExperience);
router
  .route("/experience/update")
  .post(middlewares.verifyAdmin, experience_controllers.updateExperience);
router
  .route("/experience/delete")
  .post(middlewares.verifyAdmin, experience_controllers.deleteExperience);

// EDUCATION ROUTES
router.route("/education/all").get(edu_controllers.getAllEducation);
router
  .route("/education/add")
  .post(middlewares.verifyAdmin, edu_controllers.createEducation);
router
  .route("/education/update")
  .post(middlewares.verifyAdmin, edu_controllers.updateEducation);
router
  .route("/education/delete")
  .post(middlewares.verifyAdmin, edu_controllers.deleteEducation);

// PROJECT ROUTES
router.route("/project/all").get(project_controllers.getAllProject);
router.route("/project/search").get(project_controllers.searchProject);
router.route("/project/one").get(project_controllers.getProject);
router
  .route("/project/add")
  .post(middlewares.verifyAdmin, project_controllers.createProject);
router
  .route("/project/delete")
  .post(middlewares.verifyAdmin, project_controllers.deleteProject);
router
  .route("/project/update")
  .post(middlewares.verifyAdmin, project_controllers.updateProject);

// SOCIAL MEDIA ROUTES
router
  .route("/socialmedia/all")
  .post(socialMedia_controllers.getSocialMediaLinks);
router
  .route("/socialmedia/add")
  .post(middlewares.verifyAdmin, socialMedia_controllers.createSocialMedia);
router
  .route("/socialmedia/delete")
  .post(middlewares.verifyAdmin, socialMedia_controllers.deleteSocialMedia);
router
  .route("/socialmedia/update")
  .post(middlewares.verifyAdmin, socialMedia_controllers.updateSocialMedia);

// CONTRIBUTION REQUEST ROUTES
router
  .route("/project/contribution/add")
  .post(contributionRequest_controllers.createContributionRequest);
router
  .route("/project/contribution/delete")
  .post(contributionRequest_controllers.deleteContributionRequest);
router
  .route("/project/contribution/all")
  .get(contributionRequest_controllers.getAllContributionRequest);
router
  .route("/project/contribution/one")
  .get(contributionRequest_controllers.searchContributionRequest);

// UNHANDLES ROUTES
router.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = router;
