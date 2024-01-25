const express = require("express");
const app = express();
const path = require("path");

const helmet = require("helmet");

const adminRouter = require("./ROUTES/admin");
const userRouter = require("./ROUTES/user");
const unhandledRoutes = require("./UTILS/unhandledRoutes");

// CONFIGURATION
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));

// ROUTES
app.use("/api/v1/admin/developer", adminRouter);
app.use("/api/v1/user", userRouter);

// UNHANDLED ROUTES
app.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = app;
