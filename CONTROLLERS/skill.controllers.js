let Skill = require(".././MODELS/skill.model");
let constants = require(".././UTILS/constants");

module.exports = { createSkill, getAllSkills, deleteSkill, updateSkill };

async function createSkill(req, res) {
  try {
    let { name } = req.body;
    if (!name) {
      return res.send({
        success: false,
        status: 200,
        message: "name is required.",
      });
    }

    let isSkill = await Skill.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!!isSkill) {
      return res.send({
        success: false,
        status: 400,
        message: constants.skillAlreadyCreated,
      });
    }

    let skill = await Skill.create({ name });

    if (!skill) {
      return res.send({
        success: false,
        status: 400,
        message: constants.skillNotCreated,
      });
    }

    res.send({
      success: true,
      status: 200,
      skill,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createSkill`,
    });
  }
}

async function getAllSkills(req, res) {
  try {
    let skills = await Skill.find().sort({ name: 1 });

    if (skills.length == 0) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noSkillFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      skills,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllSkills`,
    });
  }
}

async function deleteSkill(req, res) {
  try {
    let { _id } = req.body;

    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isSkill = await Skill.findOne({ _id });

    if (!isSkill) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noSkillFound,
      });
    }

    await Skill.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.skillDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteSkill`,
    });
  }
}

async function updateSkill(req, res) {
  try {
    let { _id, name } = req.body;

    let invalidFields = [];
    if (!_id) {
      invalidFields.push("_id");
    }

    if (!name) {
      invalidFields.push("name");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Error: ${invalidFields.join(", ")}`,
      });
    }

    let isSkill = await Skill.findOne({ _id });

    if (!isSkill) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noSkillFound,
      });
    }

    await Skill.updateOne({ _id }, { name, updatedAt: Date.now() });

    res.send({
      success: true,
      status: 200,
      message: constants.skillUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateSkill`,
    });
  }
}
