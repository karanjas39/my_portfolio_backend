const nodemailer = require("nodemailer");

async function sendEmail(req, res) {
  try {
    const { email, subject, html } = req.body;
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
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
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

    await transporter.sendMail(mailOptions);
    return res.send({
      success: true,
      status: 200,
      message: "Email sent successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Email not sent.`,
      error: error.toString() + " in sendEmail",
    });
  }
}

module.exports = sendEmail;
