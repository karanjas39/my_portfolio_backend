module.exports = { login_user };

async function login_user(req, res) {
  try {
    let { data } = req.body;

    res.send({
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(`Error: ${error.toString()} in login_user`);
  }
}
