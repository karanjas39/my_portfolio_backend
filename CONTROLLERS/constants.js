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
};
