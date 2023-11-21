const express = require("express");
const app = express();

const cors = require("cors");

const adminRouter = require("./ROUTES/admin");
const userRouter = require("./ROUTES/user");

const util_controllers = require("./CONTROLLERS/utils.controllers");

// CONFIGURATION
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));

// ROUTES
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

// UNHANDLES ROUTES
app.route("*").all(util_controllers.unhandleRoutes);

module.exports = app;
