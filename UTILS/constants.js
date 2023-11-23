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
};
