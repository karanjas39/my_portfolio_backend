const uuid = require("uuid");
const constants = require(".././UTILS/constants");
const modifyTemplate = require(".././UTILS/modifyEmailTemplate");
const sendEmail = require("../UTILS/sendEmail");

module.exports = generateOTP;

async function generateOTP(id) {
  try {
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    const generatedUUID = uuid.v4().replace(/-/g, "");
    const combinedString = otp + generatedUUID;
    let changePasswordEmailObject = constants.changePasswordEmail;
    let content = changePasswordEmailObject.content.replace(
      "{otp}",
      combinedString
    );
    let title = changePasswordEmailObject.title;
    let subject = changePasswordEmailObject.subject;

    const html = modifyTemplate(title, "Jaskaran Singh", content);

    let isEmailSend = await sendEmail(constants.myEmail, subject, html);

    return { otp: combinedString, isEmailSend };
  } catch (error) {
    throw new Error(error.toString());
  }
}
