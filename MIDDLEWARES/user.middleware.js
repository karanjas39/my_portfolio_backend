module.exports = { getUrlAndInjectCode };

function getUrlAndInjectCode(req, res, next) {
  try {
    let url = req.originalUrl;

    if (url == "/api/v1/user/developer/details") {
      req.body.options = "name cv_link fileName";
    } else if (url == "/api/v1/user/developer/role/all") {
      req.body.options = "name";
    } else if (url == "/api/v1/user/developer/skill/all") {
      req.body.options = "name";
    } else if (url == "/api/v1/user/developer/experience/all") {
      req.body.options = "from to role";
    } else if (url == "/api/v1/user/developer/education/all") {
      req.body.options = "from to institute";
    } else if (
      url == "/api/v1/user/developer/project/all" ||
      url == "/api/v1/user/developer/project/one" ||
      url == "/api/v1/user/developer/project/search"
    ) {
      req.body.options =
        "title brief_description detailed_description links techStack";
    }

    next();
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getUrlAndInjectCode`,
    });
  }
}
