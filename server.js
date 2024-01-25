const { config } = require("dotenv");
config({ path: "./CONFIG/config.env" });

const db_connect = require("./DB/connect");
const app = require("./app");

(async () => {
  try {
    await db_connect();
    app.listen(process.env.PORT, () => {
      console.log(`SERVER IS RUNNING AT PORT: ${process.env.PORT}`);
      console.log(process.env.CORS_ORIGIN_ADMIN);
      console.log(process.env.CORS_ORIGIN_USER);
    });
  } catch (error) {
    console.error("DB CONNECTION ERROR: ", error.toString());
  }
})();
