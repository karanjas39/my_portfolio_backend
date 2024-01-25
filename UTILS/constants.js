const contactFromField = ["Portfolio", "Opentalks"];

// LOGIN
const invalidCreds =
  "Invalid credentials. Please double-check your username and password.";

const chnagePassOtpNotSent = "Failed to send the OTP. Try again later.";
const chnagePasswordOtpSent = "Check your email for the OTP and enter it.";

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
const developerUpdated = "Developer updated successfully.";
const cvNotUploaded = "Developer CV not uploaded successfully.";

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
const projectFilterRequired = "Project filter rquired";

// SOCIAL MEDIA
const socialMediaNotCreated = "New Social Media cannot be created.";
const socialMediaAlreadyCreated = "This Social Media is already created.";
const noSocialMediaFound = "No Social Media found.";
const socialMediaDeleted = "Social Media deleted successfully.";
const socialMediaUpdated = "Social Media updated successfully.";

// GENERAL
const _idRequired = "_id is required";
const tooManyRequests = "Rate limit exceeded. Please try again later.";
const myEmail = "dhillonjaskaran4486@gmail.com";

// CONTRIBUTION REQUESTS
const contributionRequestNotCreated =
  "New contribution request cannot be created.";
const contributionRequestAlreadyCreated =
  "This contribution request is already created.";
const noContributionRequestFound = "No contribution request found.";
const contributionRequestDeleted = "Contribution request deleted successfully.";

// EMAIL
const newProjectContributionEmail = {
  title: "Collaboration Opportunity: {project_name} Contribution Request",
  content: `You've received a contribution request for your project, {project_name} from {contributor_name}. Check it out and collaborate with {contributor_name} to enhance the project further.<br />Click <a href="mailto:{contributor_email}" style="color: #c07f00;">here</a>
    to send an email to {contributor_name}.<br />
    Click <a href="https://wa.me/{whatsapp_number}" style="color: #c07f00;">here</a>
    to send a WhatsApp message to {contributor_name}.`,
  subject: "Contribution Request for {project_name}!!",
};

const changePasswordEmail = {
  title: "Password Reset OTP",
  content: `<p>You've requested to reset your password. Please use the following OTP to reset your password:</p>
  <h3>{otp}</h3>
  <p>This OTP is valid for 5 minutes. Do not share it with others.</p>`,
  subject: "Password Reset OTP",
};

const newFormSubmissionEmail = {
  title: "New Form Submission: {source}",
  content: `{name} has submitted a form on your website. Below are the details:
  <br /><br />
  <strong>Name:</strong> {name}
  <br />
  <strong>Email:</strong> {email}
  <br />
  <strong>Message:</strong> {message} <br /><br />
  Please review the details and respond accordingly.`,
};

// CONTACTS
const contactNotCreated = "New contact cannot be created.";
const noContactFound = "No contact found.";
const contactDeleted = "Contact deleted successfully.";
const invalidContactForm =
  "Not expecting any contact form submissions from this source.";
const contactCreated = "Contact created successfully.";

module.exports = {
  tooManyRequests,
  invalidCreds,
  chnagePassOtpNotSent,
  chnagePasswordOtpSent,
  invalidEndpoint,
  unauthorizedAccess,
  tokenRequired,
  tokenExpired,
  developerNotFound,
  developerUpdated,
  cvNotUploaded,
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
  projectFilterRequired,
  projectTechDeleted,
  noProjectFound,
  projectUpdated,
  projectNotCreated,
  searchQuery,
  socialMediaAlreadyCreated,
  socialMediaDeleted,
  socialMediaUpdated,
  noSocialMediaFound,
  socialMediaNotCreated,
  contributionRequestAlreadyCreated,
  contributionRequestNotCreated,
  contributionRequestDeleted,
  noContributionRequestFound,
  newFormSubmissionEmail,
  newProjectContributionEmail,
  changePasswordEmail,
  myEmail,
  contactDeleted,
  contactFromField,
  contactNotCreated,
  contactCreated,
  invalidContactForm,
  noContactFound,
};
