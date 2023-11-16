const { config } = require("dotenv");
config({ path: "./CONFIG/config.env" });

const db_connect = require("./DB/connect");
const app = require("./app");

(async () => {
  try {
    await db_connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Server Error:", error.toString());
  }
})();
