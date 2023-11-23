const Experience = require(".././MODELS/experience.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createExperience,
  deleteExperience,
  updateExperience,
  getAllExperience,
};

async function createExperience(req, res) {
  try {
    let { role, from, to } = req.body;
    let invalidFields = [];
    if (!role) {
      invalidFields.push("role");
    }
    if (!from) {
      invalidFields.push("from");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required fields: ${invalidFields.join(", ")}`,
      });
    }

    let escapedChars = role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let isExp = await Experience.findOne({
      role: { $regex: new RegExp(escapedChars, "i") },
    });

    if (!!isExp) {
      return res.send({
        success: false,
        status: 400,
        message: constants.expAlreadyCreated,
      });
    }

    let exp = await Experience.create({ role });

    if (!exp) {
      return res.send({
        success: false,
        status: 400,
        message: constants.expNotCreated,
      });
    }

    res.send({
      success: true,
      status: 200,
      exp,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createExperience`,
    });
  }
}
async function deleteExperience(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isExp = await Experience.findOne({ _id });

    if (!isExp) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noExpFound,
      });
    }

    await Experience.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.expDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteExperience`,
    });
  }
}
async function updateExperience(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isExp = await Experience.findOne({ _id });

    if (!isExp) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noExpFound,
      });
    }

    await Experience.updateOne({ _id }, { ...req.body, updatedAt: Date.now() });

    res.send({
      success: true,
      status: 200,
      message: constants.expUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateExperience`,
    });
  }
}
async function getAllExperience(req, res) {
  try {
    let exps = await Experience.find().sort({ from: -1 });

    if (exps.length == 0) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noExpFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      exps,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllExperience`,
    });
  }
}
