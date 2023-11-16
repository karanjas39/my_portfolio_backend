const mongoose = require("mongoose");

module.exports = db_connect;

async function db_connect() {
  try {
    let db = await mongoose.connect(process.env.DB_CONNECTION);
    console.log(`DB Connected successfully.\nDB Host: ${db.connection.host}`);
  } catch (error) {
    console.log(`MONGODB ERROR: ${error.toString()}`);
    process.exit(0);
  }
}
