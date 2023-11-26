const Education = require(".././MODELS/education.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createEducation,
  deleteEducation,
  updateEducation,
  getAllEducation,
};

async function createEducation(req, res) {
  try {
    let { institute, from, to } = req.body;
    let invalidFields = [];
    if (!institute) {
      invalidFields.push("institute");
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

    let isEdu = await Education.findOne({
      institute: { $regex: new RegExp(institute, "i") },
    });

    if (!!isEdu) {
      return res.send({
        success: false,
        status: 400,
        message: constants.eduAlreadyCreated,
      });
    }

    let edu = await Education.create({ institute, from, to });

    if (!edu) {
      return res.send({
        success: false,
        status: 400,
        message: constants.eduNotCreated,
      });
    }

    res.send({
      success: true,
      status: 200,
      edu,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createEducation`,
    });
  }
}
async function deleteEducation(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isEdu = await Education.findOne({ _id });

    if (!isEdu) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noEduFound,
      });
    }

    await Education.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.eduDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteEducation`,
    });
  }
}
async function updateEducation(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isEdu = await Education.findOne({ _id });

    if (!isEdu) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noEduFound,
      });
    }

    await Education.updateOne({ _id }, { ...req.body, updatedAt: Date.now() });

    res.send({
      success: true,
      status: 200,
      message: constants.eduUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateEducation`,
    });
  }
}
async function getAllEducation(req, res) {
  try {
    let edus = await Education.find().sort({ from: -1 });

    if (edus.length == 0) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noEduFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      edus,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllEducation`,
    });
  }
}
