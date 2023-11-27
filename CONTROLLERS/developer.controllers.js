const Developer = require(".././MODELS/developer.model");
const constants = require("../UTILS/constants");

module.exports = { getDeveloperDetails, updateDeveloperDetails };

async function getDeveloperDetails(req, res) {
  try {
    let { options = "" } = req.body;

    let developer = await Developer.findOne().select(options);

    if (!developer) {
      return res.send({
        success: false,
        status: 404,
        message: constants.developerNotFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      developer,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getDeveloperDetails`,
    });
  }
}

async function updateDeveloperDetails(req, res) {
  try {
    let { _id } = req.body;

    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let developer = await Developer.findOne({ _id });

    if (!developer) {
      return res.send({
        success: false,
        status: 404,
        message: constants.developerNotFound,
      });
    }

    let updatedDeveloper = await Developer.updateOne(
      { _id },
      { ...req.body, updatedAt: Date.now() }
    );

    res.send({
      success: true,
      status: 200,
      updatedDeveloper,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateDeveloperDetails`,
    });
  }
}
