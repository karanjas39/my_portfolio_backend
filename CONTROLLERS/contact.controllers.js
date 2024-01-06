const Contact = require(".././MODELS/contact.model");
const constants = require(".././UTILS/constants");

const sendEmail = require(".././UTILS/sendEmail");
const modifyTemplate = require(".././UTILS/modifyEmailTemplate");

module.exports = { createContact, deleteContact, getAllContact, searchContact };

async function createContact(req, res) {
  try {
    let { from, name, email, message } = req.body;
    let invalidFields = [];
    if (!from) {
      invalidFields.push("from");
    }
    if (!name) {
      invalidFields.push("name");
    }
    if (!email) {
      invalidFields.push("email");
    }
    if (!message) {
      invalidFields.push("message");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }
    let isFromValid = constants.contactFromField.includes(from);
    if (!isFromValid) {
      return res.send({
        success: false,
        status: 404,
        message: constants.invalidContactForm,
      });
    }

    let isContact = await Contact.countDocuments({ from, email });
    if (isContact.length >= 5) {
      return res.send({
        success: false,
        status: 400,
        message: constants.tooManyRequests,
      });
    }

    let contact = await Contact.create({ from, name, email, message });

    if (!contact) {
      return res.send({
        success: false,
        status: 400,
        message: constants.contactNotCreated,
      });
    }

    let contactFormEmailObject = constants.newFormSubmissionEmail;
    let title = contactFormEmailObject.title.replace("{source}", from);
    let content = contactFormEmailObject.content.replace(/{name}/g, name);
    content = content.replace("{email}", email);
    content = content.replace("{message}", message);
    let html = modifyTemplate(title, "Jaskaran Singh", content);

    await sendEmail(constants.myEmail, title, html);

    res.send({
      success: true,
      status: 200,
      message: constants.contactCreated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createContact`,
    });
  }
}

async function deleteContact(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isContact = await Contact.findOne({ _id });

    if (!isContact) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContactFound,
      });
    }

    await Contact.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.contactDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteContact`,
    });
  }
}

async function getAllContact(req, res) {
  try {
    let { startPoint = 0 } = req.query;

    let contacts = await Contact.find().skip(startPoint).limit(10);
    if (contacts.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContactFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      contacts,
      nextStartPoint: Number(startPoint) + 10,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllContact`,
    });
  }
}

async function searchContact(req, res) {
  try {
    let { query, startPoint = 0, options = "" } = req.query;
    if (!query) {
      return res.send({
        success: false,
        status: 404,
        message: constants.searchQuery,
      });
    }

    const regex = new RegExp(query, "gi");

    const contacts = await Contact.find({
      $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
    })
      .skip(startPoint)
      .limit(10)
      .select(options);

    if (contacts.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContactFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      contacts,
      nextStartPoint: Number(startPoint) + 10,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in searchContact`,
    });
  }
}
