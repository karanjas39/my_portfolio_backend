const Constants = require("./constants");

module.exports = { unhandleRoutes };

function unhandleRoutes(req, res) {
  try {
    res.send({
      status: 404,
      success: false,
      message: Constants.invalidEndpoint,
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in unhandleRoutes`);
  }
}
