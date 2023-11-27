// @collapse
const Project = require(".././MODELS/project.model");
const Skills = require(".././MODELS/skill.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createProject,
  createProjectLinks,
  createProjectTech,
  deleteProject,
  deleteProjectLinks,
  deleteProjectTech,
  updateProject,
  updateProjectLinks,
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

async function createProjectLinks(req, res) {
  try {
    let { _id, link_title, link_url } = req.body;

    let invalidFields = [];

    if (!_id) {
      invalidFields.push("_id");
    }
    if (!link_title) {
      invalidFields.push("link_title");
    }
    if (!link_url) {
      invalidFields.push("link_url");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
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

    await Project.updateOne(
      { _id },
      { $push: { links: { link_title, link_url } } },
      { new: true }
    );

    res.send({
      success: true,
      status: 200,
      message: constants.projectLinkCreated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error} in createProjectLinks`,
    });
  }
}

async function createProjectTech(req, res) {
  try {
    let { _id, techId } = req.body;

    let invalidFields = [];

    if (!_id) {
      invalidFields.push("_id");
    }
    if (!techId) {
      invalidFields.push("techId");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
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

    let isTech = await Skills.findOne({ _id: techId });

    if (!isTech) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noSkillFound,
      });
    }

    await Project.updateOne(
      { _id },
      { $push: { techStack: { techId } } },
      { new: true }
    );

    res.send({
      success: true,
      status: 200,
      message: constants.projectTechCreated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createProjectTech`,
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

async function deleteProjectLinks(req, res) {
  try {
    let { _id, linkId } = req.body;
    let invalidFields = [];

    if (!_id) {
      invalidFields.push("_id");
    }
    if (!linkId) {
      invalidFields.push("linkId");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isProject = await Project.findOne({ _id, "links._id": linkId });

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }

    await Project.updateOne({ _id }, { $pull: { links: { _id: linkId } } });

    res.send({
      success: true,
      status: 200,
      message: constants.projectLinkDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteProjectLinks`,
    });
  }
}

async function deleteProjectTech(req, res) {
  try {
    let { _id, techId } = req.body;
    let invalidFields = [];

    if (!_id) {
      invalidFields.push("_id");
    }
    if (!techId) {
      invalidFields.push("techId");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
      });
    }

    let isProject = await Project.findOne({ _id, "techStack._id": techId });

    if (!isProject) {
      return res.send({
        success: false,
        status: 400,
        message: constants.noProjectFound,
      });
    }

    await Project.updateOne({ _id }, { $pull: { techStack: { _id: techId } } });

    res.send({
      success: true,
      status: 200,
      message: constants.projectTechDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteProjectTech`,
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

async function updateProjectLinks(req, res) {
  try {
    let { _id, links } = req.body;

    let invalidFields = [];

    if (!_id) {
      invalidFields.push("_id");
    }
    if (links.length == 0) {
      invalidFields.push("links");
    }

    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required: ${invalidFields.join(", ")}`,
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

    for (let link of links) {
      let { linkId, link_title, link_url } = link;
      await Project.updateOne(
        { _id, "links._id": linkId },
        {
          $set: {
            "links.$.link_title": link_title,
            "links.$.link_url": link_url,
            updatedAt: Date.now(),
          },
        }
      );
    }

    res.send({
      success: true,
      status: 200,
      message: constants.projectUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateProjectLinks`,
    });
  }
}

async function getAllProject(req, res) {
  try {
    let { startPoint = 0, options = "" } = req.body;

    let projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(startPoint)
      .limit(5)
      .populate({
        path: "techStack.techId",
        select: "name",
      })
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
      nextStartPoint: startPoint + 5,
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
    let { _id, options = "" } = req.body;
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
    let { query, options = "" } = req.body;
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
        { detailed_description: { $regex: regex } },
      ],
    }).select(options);

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
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in searchProject`,
    });
  }
}
