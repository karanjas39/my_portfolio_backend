const Project = require(".././MODELS/project.model");
const ContributionRequest = require(".././MODELS/contributionRequest.model");
const constants = require(".././UTILS/constants");
const { finished } = require("nodemailer/lib/xoauth2");

module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getAllProject,
  getProject,
  getAllProjectUser,
  searchProject,
  searchProjectUser,
  filterProject,
  filterProjectUser,
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
    let result = 0;
    let projects = await Project.find()
      .skip(startPoint)
      .limit(5)
      .select(options)
      .sort({ title: 1 });

    if (projects.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noProjectFound,
      });
    }
    if (startPoint == 0) {
      result = await Project.countDocuments();
    }
    res.send({
      success: true,
      status: 200,
      projects,
      nextStartPoint: Number(startPoint) + 5,
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getAllProject`,
    });
  }
}

async function getAllProjectUser(req, res) {
  try {
    let { startPoint = 0, options = "" } = req.query;
    let projects = await Project.find({ active: true })
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
    let result = 0;

    if (!query) {
      return res.send({
        success: false,
        status: 404,
        message: constants.searchQuery,
      });
    }

    const regex = new RegExp(query, "i");

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

    if (startPoint == 0) {
      result = await Project.countDocuments({
        $or: [
          { title: { $regex: regex } },
          { brief_description: { $regex: regex } },
        ],
      });
    }

    res.send({
      success: true,
      status: 200,
      projects,
      nextStartPoint: Number(startPoint) + 5,
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in searchProject`,
    });
  }
}

async function searchProjectUser(req, res) {
  try {
    let { query, options = "", startPoint = 0 } = req.query;
    if (!query) {
      return res.send({
        success: false,
        status: 404,
        message: constants.searchQuery,
      });
    }

    const regex = new RegExp(query, "i");

    const projects = await Project.find({
      $or: [
        { title: { $regex: regex }, active: true },
        { brief_description: { $regex: regex }, active: true },
        { detailed_description: { $regex: regex }, active: true },
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

async function filterProject(req, res) {
  try {
    let { filter, options = "", startPoint = 0 } = req.body;
    let result = 0;

    let query = {};
    if (!filter || Object.keys(filter).length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.projectFilterRequired,
      });
    }
    if (!!filter.techStack) {
      query["techStack.techId"] = filter.techStack;
    }
    if (!!filter.contributorName) {
      query.contributors = { $regex: new RegExp(filter.contributorName, "i") };
    }
    if (!!filter.startedOn) {
      query.startedOn = { $gte: filter.startedOn };
    }
    if (!!filter.finishedOn) {
      query.finishedOn = filter.finishedOn;
    }
    if (!!filter.createdAt) {
      query.createdAt = { $gte: filter.createdAt };
    }
    if (!!filter.updatedAt) {
      query.updatedAt = { $gte: filter.updatedAt };
    }
    if (filter.hasOwnProperty("active")) {
      query.active = filter.active;
    }

    let projects = await Project.find(query)
      .select(options)
      .skip(startPoint)
      .limit(5);

    if (projects.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noProjectFound,
      });
    }
    if (startPoint == 0) {
      result = await Project.countDocuments(query);
    }

    res.send({
      success: true,
      status: 200,
      projects,
      nextStartPoint: startPoint + 5,
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in filterProject`,
    });
  }
}

async function filterProjectUser(req, res) {
  try {
    let { filter, options = "", startPoint = 0 } = req.body;
    let query = {};
    if (!filter || Object.keys(filter).length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.projectFilterRequired,
      });
    }
    if (!!filter.techStack) {
      query["techStack.techId"] = filter.techStack;
    }
    if (!!filter.contributorName) {
      query.contributors = { $regex: new RegExp(filter.contributorName, "i") };
    }
    if (!!filter.startedOn) {
      query.startedOn = { $gte: filter.startedOn };
    }
    if (!!filter.finishedOn) {
      query.finishedOn = { $lte: filter.finishedOn };
    }
    if (filter.hasOwnProperty("active")) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noProjectFound,
      });
    }

    let projects = await Project.find({ ...query, active: true })
      .select(options)
      .skip(startPoint)
      .limit(5);

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
      nextStartPoint: startPoint + 5,
      startPoint,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in filterProject`,
    });
  }
}
