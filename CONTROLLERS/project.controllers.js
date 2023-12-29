// @collapse
const Project = require(".././MODELS/project.model");
const ContributionRequest = require(".././MODELS/contributionRequest.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getAllProject,
  getProject,
  searchProject,
};

async function createProject(req, res) {
  try {
    let {
      title,
      brief_description,
      detailed_description,
      links = [],
      techStack = [],
      startedOn,
      finishedOn,
      contributors,
      active = true,
    } = req.body;

    let invalidFields = [];

    if (!title) {
      invalidFields.push("title");
    }
    if (!brief_description) {
      invalidFields.push("brief_description");
    }
    if (!detailed_description) {
      invalidFields.push("detailed_description");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let escapedChars = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let isProject = await Project.findOne({
      title: { $regex: new RegExp(escapedChars, "i") },
    });

    if (!!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.projectAlreadyCreated,
      });
    }

    let project = await Project.create({
      title,
      brief_description,
      detailed_description,
      links,
      techStack,
      contributors,
      startedOn,
      finishedOn,
      active,
    });

    if (!project) {
      return res.send({
        success: false,
        status: 400,
        message: constants.projectNotCreated,
      });
    }
    res.send({
      success: true,
      status: 200,
      project,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error} in createProject`,
    });
  }
}

async function deleteProject(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isProject = await Project.findOne({ _id });

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }

    await Project.deleteOne({ _id });
    await ContributionRequest.deleteMany({ project_id: _id });

    res.send({
      success: true,
      status: 200,
      message: constants.projectDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteProject`,
    });
  }
}

async function updateProject(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isProject = await Project.findOne({ _id });

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }

    await Project.updateOne({ _id }, { ...req.body, updatedAt: Date.now() });

    res.send({
      success: true,
      status: 200,
      message: constants.projectUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateProject`,
    });
  }
}

async function getAllProject(req, res) {
  try {
    let { startPoint = 0, options = "" } = req.query;
    let projects = await Project.find()
      .skip(startPoint)
      .limit(5)
      .select(options)
      .sort({ createdAt: -1 });

    if (projects.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noProjectFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      projects,
      nextStartPoint: Number(startPoint) + 5,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllProject`,
    });
  }
}

async function getProject(req, res) {
  try {
    let { _id, options = "" } = req.query;

    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isProject = await Project.findOne({ _id })
      .populate({
        path: "techStack.techId",
        select: "name",
      })
      .select(options);

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }
    res.send({
      success: true,
      status: 200,
      projects: isProject,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllProjectLinks`,
    });
  }
}

async function searchProject(req, res) {
  try {
    let { query, options = "", startPoint = 0 } = req.query;
    if (!query) {
      return res.send({
        success: false,
        status: 404,
        message: constants.searchQuery,
      });
    }

    const regex = new RegExp(query, "gi");

    const projects = await Project.find({
      $or: [
        { title: { $regex: regex } },
        { brief_description: { $regex: regex } },
      ],
    })
      .populate({
        path: "techStack.techId",
        select: "name",
      })
      .skip(startPoint)
      .limit(5)
      .select(options);

    if (projects.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noProjectFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      projects,
      nextStartPoint: Number(startPoint) + 5,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in searchProject`,
    });
  }
}
