// LOGIN
const invalidCreds =
  "Invalid credentials. Please double-check your username and password.";

//ROUTES
const invalidEndpoint = "Invalid endpoint. This API endpoint does not exist.";

// MIDDLEWARES
const unauthorizedAccess =
  "Unauthorized access. You do not have the necessary permissions.";
const tokenRequired = "Authentication token is required.";
const tokenExpired = "Authentication token has expired.";

// DEVELOPERS
const developerNotFound =
  "Developer not found. Please check the provided information and try again.";

// ROLES
const roleNotCreated = "New Role cannot be created.";
const roleAlreadyCreated = "Role is already created.";
const noRoleFound = "No role found.";
const roleDeleted = "Role deleted successfully.";
const roleUpdated = "Role updated successfully.";

// SKILLS
const skillNotCreated = "New skill cannot be created.";
const skillAlreadyCreated = "Skill is already created.";
const noSkillFound = "No skill found.";
const skillDeleted = "Skill deleted successfully.";
const skillUpdated = "Skill updated successfully.";

// EXPERIENCE
const expNotCreated = "New Experience cannot be created.";
const expAlreadyCreated = "This Experience is already created.";
const noExpFound = "No experience found.";
const expDeleted = "Experience deleted successfully.";
const expUpdated = "Experience updated successfully.";

// EDUCATION
const eduNotCreated = "New Education cannot be created.";
const eduAlreadyCreated = "This Education is already created.";
const noEduFound = "No Education found.";
const eduDeleted = "Education deleted successfully.";
const eduUpdated = "Education updated successfully.";

// PROJECT
const projectNotCreated = "New project cannot be created.";
const projectLinkCreated = "New project link created successfully.";
const projectTechCreated = "New project Tech Stack is created successfully.";
const projectAlreadyCreated = "This project is already created.";
const noProjectFound = "No project found.";
const projectDeleted = "Project is deleted successfully.";
const projectLinkDeleted = "Project link deleted successfully.";
const projectTechDeleted = "Project Tech Stack is deleted successfully.";
const projectUpdated = "Project updated successfully.";
const searchQuery = "Search Query is required.";

// GENERAL
const _idRequired = "_id is required";

module.exports = {
  invalidCreds,
  invalidEndpoint,
  unauthorizedAccess,
  tokenRequired,
  tokenExpired,
  developerNotFound,
  _idRequired,
  roleNotCreated,
  roleAlreadyCreated,
  noRoleFound,
  roleDeleted,
  roleUpdated,
  skillDeleted,
  skillNotCreated,
  skillUpdated,
  noSkillFound,
  skillAlreadyCreated,
  noExpFound,
  expAlreadyCreated,
  expNotCreated,
  expDeleted,
  expUpdated,
  eduNotCreated,
  eduAlreadyCreated,
  noEduFound,
  eduDeleted,
  eduUpdated,
  projectAlreadyCreated,
  projectLinkCreated,
  projectTechCreated,
  projectDeleted,
  projectLinkDeleted,
  projectTechDeleted,
  noProjectFound,
  projectUpdated,
  projectNotCreated,
  searchQuery,
};
