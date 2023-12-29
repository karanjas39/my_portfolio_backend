const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const adminRouter = require("./ROUTES/admin");
const userRouter = require("./ROUTES/user");
const unhandledRoutes = require("./UTILS/unhandledRoutes");
const constants = require("./UTILS/constants");

// CONFIGURATION
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));
// app.use(
//   rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 100,
//     handler: (req, res) => {
//       res.send({
//         status: 400,
//         message: constants.tooManyRequests,
//       });
//     },
//   })
// );

// ROUTES
app.use("/api/v1/admin/developer", adminRouter);
app.use("/api/v1/user", userRouter);

// UNHANDLED ROUTES
app.route("*").all(unhandledRoutes.unhandleRoutes);

module.exports = app;
