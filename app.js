const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const helmet = require("helmet");

const adminRouter = require("./ROUTES/admin");
const userRouter = require("./ROUTES/user");
const unhandledRoutes = require("./UTILS/unhandledRoutes");
const whitelist = [process.env.CORS_ORIGIN_USER, process.env.CORS_ORIGIN_ADMIN];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// CONFIGURATION
app.use(cors(corsOptions));
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
