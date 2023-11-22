// @collapse
const Roles = require(".././MODELS/roles.model");
const constants = require("../UTILS/constants");

module.exports = { createRole, allRoles, deleteRole, updateRole };

async function createRole(req, res) {
  try {
    let { name } = req.body;
    if (!name) {
      return res.send({
        success: false,
        status: 404,
        message: "name is required.",
      });
    }

    let isRole = await Roles.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!!isRole) {
      return res.send({
        success: false,
        status: 400,
        message: constants.roleAlreadyCreated,
      });
    }

    let role = await Roles.create({ name });

    if (!role) {
      return res.send({
        success: false,
        status: 404,
        message: constants.roleNotCreated,
      });
    }

    res.send({
      success: true,
      status: 200,
      role,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createRole`,
    });
  }
}

async function allRoles(req, res) {
  try {
    let roles = await Roles.find();

    if (roles.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noRoleFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      roles,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createRole`,
    });
  }
}

async function deleteRole(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isRole = await Roles.findOne({ _id });

    if (!isRole) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noRoleFound,
      });
    }

    await Roles.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.roleDeleted,
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in deleteRole`);
  }
}

async function updateRole(req, res) {
  try {
    let { _id, name } = req.body;

    let invalidFields = [];
    if (!name) {
      invalidFields.push("name");
    }

    if (!_id) {
      invalidFields.push("_id");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required fields: ${invalidFields.join(", ")}`,
      });
    }

    let isRole = await Roles.findOne({ _id });

    if (!isRole) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noRoleFound,
      });
    }

    await Roles.updateOne({ _id }, { name, updatedAt: Date.now() });

    res.send({
      success: true,
      status: 200,
      message: constants.roleUpdated,
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in updateRole`);
  }
}
