const express = require("express");
const app = express();

const cors = require("cors");

const router = require("./ROUTES/admin");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", router);

module.exports = app;
