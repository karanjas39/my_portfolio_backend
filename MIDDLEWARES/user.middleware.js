const url = require("url");

module.exports = { getUrlAndInjectCode };

function getUrlAndInjectCode(req, res, next) {
  try {
    let url = getOriginalUrlWithoutQueries(req);
    const query = req.originalUrl.slice(url.length);

    if (url == "/api/v1/user/developer/details") {
      req.body.options = "name cv_link fileName";
    } else if (url == "/api/v1/user/developer/role/all") {
      req.body.options = "name";
    } else if (url == "/api/v1/user/socialmedia/all") {
      req.body.options = "icon link";
    } else if (url == "/api/v1/user/developer/skill/all") {
      req.body.options = "name";
    } else if (url == "/api/v1/user/developer/experience/all") {
      req.body.options = "from to role current";
    } else if (url == "/api/v1/user/developer/education/all") {
      req.body.options = "from to institute current";
    } else if (
      url == "/api/v1/user/developer/project/all" ||
      url == "/api/v1/user/developer/project/search"
    ) {
      req.query.options = "title brief_description";
    } else if (url == "/api/v1/user/developer/project/one") {
      req.query.options =
        "title brief_description detailed_description links techStack contributors startedOn finishedOn";
    }
    req.originalUrl = url + query;

    next();
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()} in getUrlAndInjectCode`,
    });
  }
}

function getOriginalUrlWithoutQueries(req) {
  const parsedUrl = url.parse(req.originalUrl);
  parsedUrl.search = null;
  return url.format(parsedUrl);
}
