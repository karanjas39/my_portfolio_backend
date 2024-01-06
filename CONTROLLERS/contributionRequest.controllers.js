const ContributionRequest = require(".././MODELS/contributionRequest.model");
const sendEmail = require(".././UTILS/sendEmail");
const modifyTemplate = require(".././UTILS/modifyEmailTemplate");
const Project = require(".././MODELS/project.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createContributionRequest,
  deleteContributionRequest,
  getAllContributionRequest,
  searchContributionRequest,
};

async function createContributionRequest(req, res) {
  try {
    let { name, email, whatsapp_number, project_id } = req.body;
    let invalidFields = [];
    if (!name) {
      invalidFields.push("name");
    }
    if (!email) {
      invalidFields.push("email");
    }
    if (!whatsapp_number) {
      invalidFields.push("whatsapp number");
    }
    if (!project_id) {
      invalidFields.push("projectid");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isProject = await Project.findOne({
      _id: project_id,
      active: true,
    }).select("title");

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }

    let isContributionRequest = await ContributionRequest.findOne({
      $or: [
        {
          email,
          project_id,
        },
        { whatsapp_number, project_id },
      ],
    });

    if (!!isContributionRequest) {
      return res.send({
        success: false,
        status: 400,
        message: constants.contributionRequestAlreadyCreated,
      });
    }
    let contributionRequest = await ContributionRequest.create({
      name,
      email,
      project_id,
      whatsapp_number,
    });

    if (!contributionRequest) {
      return res.send({
        success: true,
        status: 200,
        message: constants.contributionRequestNotCreated,
      });
    }

    const projectContributionObject = constants.newProjectContributionEmail;
    let title = projectContributionObject.title.replace(
      "{project_name}",
      isProject.title
    );
    let subject = projectContributionObject.subject.replace(
      "{project_name}",
      isProject.title
    );
    let content = projectContributionObject.content.replace(
      "{project_name}",
      isProject.title
    );
    content = content.replace(/{contributor_name}/g, name);
    content = content.replace("{whatsapp_number}", whatsapp_number);
    content = content.replace("{contributor_email}", email);

    const html = modifyTemplate(title, "Jaskaran Singh", content);

    let isEmailSend = await sendEmail(constants.myEmail, subject, html);

    res.send({
      success: true,
      status: 200,
      contributionRequest,
      isEmailSend,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createContributionRequest`,
    });
  }
}

async function deleteContributionRequest(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isContributionRequest = await ContributionRequest.findOne({ _id });

    if (!isContributionRequest) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContributionRequestFound,
      });
    }

    await ContributionRequest.deleteOne({ _id });
    res.send({
      success: true,
      status: 200,
      message: constants.contributionRequestDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteContributionRequest`,
    });
  }
}

async function searchContributionRequest(req, res) {
  try {
    let { query, startPoint = 0, project_id } = req.query;
    let results;
    let invalidFields = [];
    if (!query) {
      invalidFields.push("query");
    }
    if (!project_id) {
      invalidFields.push("project_id");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    const regex = new RegExp(query, "gi");

    let contributionRequests = await ContributionRequest.find({
      $or: [
        {
          name: { $regex: regex },
          project_id,
        },
        {
          email: { $regex: regex },
          project_id,
        },
      ],
    })
      .skip(startPoint)
      .limit(5);

    if (contributionRequests.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContributionRequestFound,
      });
    }

    if (startPoint == 0) {
      results = await ContributionRequest.countDocuments({
        $or: [
          {
            name: { $regex: regex },
            project_id,
          },
          {
            email: { $regex: regex },
            project_id,
          },
        ],
      });
    }

    res.send({
      success: true,
      status: 200,
      contributionRequests,
      nextStartPoint: Number(startPoint) + 5,
      results,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in searchContributionRequest`,
    });
  }
}

async function getAllContributionRequest(req, res) {
  try {
    let { project_id, startPoint = 0 } = req.query;
    let results;
    if (!project_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let contributionRequests = await ContributionRequest.find({
      project_id,
    })
      .skip(startPoint)
      .limit(5);
    // .sort({ createdAt: -1 });

    if (contributionRequests.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noContributionRequestFound,
      });
    }

    if (startPoint == 0) {
      results = await ContributionRequest.countDocuments({ project_id });
    }

    res.send({
      success: true,
      status: 200,
      contributionRequests,
      nextStartPoint: Number(startPoint) + 5,
      results,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllContributionRequest`,
    });
  }
}
