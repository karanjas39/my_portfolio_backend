const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const adminRouter = require("./ROUTES/admin");
const userRouter = require("./ROUTES/user");
const unhandledRoutes = require("./UTILS/unhandledRoutes");
const constants = require("./UTILS/constants");
const contact_controllers = require("./CONTROLLERS/contact.controllers");

// CONFIGURATION
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
      res.send({
        status: 400,
        message: constants.tooManyRequests,
      });
    },
  })
);

// ROUTES

app.route("/api/v1/contact/add").post(contact_controllers.createContact);

app.use(
  "/api/v1/admin/developer",
  cors({ origin: process.env.CORS_ORIGIN_ADMIN }),
  adminRouter
);
app.use(
  "/api/v1/user",
  cors({ origin: process.env.CORS_ORIGIN_USER }),
  userRouter
);

// UNHANDLED ROUTES
app.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = app;
