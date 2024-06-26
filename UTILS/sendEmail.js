const nodemailer = require("nodemailer");

async function sendEmail(email, subject, html) {
  try {
    let invalidFields = [];
    if (!email) {
      invalidFields.push("email");
    }
    if (!subject) {
      invalidFields.push("subject");
    }
    if (!html) {
      invalidFields.push("html");
    }
    if (invalidFields.length != 0) {
      throw new Error(`Required: ${invalidFields.join(", ")}`);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Jaskaran Singh <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      status: 200,
      message: "Email sent successfully.",
      info: info,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: `Email not sent: ${error.message}`,
      error: error.toString() + " in sendEmail",
    };
  }
}

module.exports = sendEmail;
