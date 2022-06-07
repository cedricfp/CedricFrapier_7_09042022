require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

// Protection contre certaines vulnérabiltés
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.static(path.join(__dirname + "/images")));

// Pour cette route, on utilise le router usersRoutes
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

module.exports = app;
