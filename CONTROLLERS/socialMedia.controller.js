const SocialMedia = require(".././MODELS/socialMedia.model");
const constants = require(".././UTILS/constants");

module.exports = {
  createSocialMedia,
  deleteSocialMedia,
  updateSocialMedia,
  getSocialMediaLinks,
};

async function createSocialMedia(req, res) {
  try {
    let { name, link, icon } = req.body;
    let invalidFields = [];
    if (!name) {
      invalidFields.push("name");
    }
    if (!link) {
      invalidFields.push("link");
    }
    if (!icon) {
      invalidFields.push("icon");
    }
    if (invalidFields.length != 0) {
      return res.send({
        success: false,
        status: 404,
        message: `Required : ${invalidFields.join(", ")}`,
      });
    }

    let isSocialMedia = await SocialMedia.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!!isSocialMedia) {
      return res.send({
        success: false,
        status: 400,
        message: constants.socialMediaAlreadyCreated,
      });
    }

    let socialMedia = await SocialMedia.create({ name, link, icon });

    if (!socialMedia) {
      return res.send({
        success: false,
        status: 400,
        message: constants.socialMediaNotCreated,
      });
    }

    res.send({
      success: true,
      status: 200,
      socialMedia,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in createSocialMedia`,
    });
  }
}
async function deleteSocialMedia(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isSocialMedia = await SocialMedia.findOne({ _id });

    if (!isSocialMedia) {
      return res.send({
        success: false,
        status: 404,
        mesage: constants.noSocialMediaFound,
      });
    }

    await SocialMedia.deleteOne({ _id });

    res.send({
      success: true,
      status: 200,
      message: constants.socialMediaDeleted,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in deleteSocialMedia`,
    });
  }
}
async function updateSocialMedia(req, res) {
  try {
    let { _id } = req.body;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: constants._idRequired,
      });
    }

    let isSocialMedia = await SocialMedia.findOne({ _id });

    if (!isSocialMedia) {
      return res.send({
        success: false,
        status: 404,
        mesage: constants.noSocialMediaFound,
      });
    }

    await SocialMedia.updateOne(
      { _id },
      { ...req.body, updatedAt: Date.now() }
    );

    res.send({
      success: true,
      status: 200,
      message: constants.socialMediaUpdated,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in updateSocialMedia`,
    });
  }
}
async function getSocialMediaLinks(req, res) {
  try {
    let { options = "" } = req.body;
    let socialMediaLinks = await SocialMedia.find().select(options);

    if (socialMediaLinks.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: constants.noSocialMediaFound,
      });
    }

    res.send({
      success: true,
      status: 200,
      socialMediaLinks,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getSocialMediaLinks`,
    });
  }
}
