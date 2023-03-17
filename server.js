var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();
require("./config/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const donorRouter = require("./routes/donor");
const donationRouter = require("./routes/donation");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "sessions",
});

app.use(
  session({
    //your code
    store: sessionStore,
  })
);

// configure express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// middleware to set user id in session if authenticated
app.use(function (req, res, next) {
  if (req.session.userid) {
    res.locals.userid = req.session.userid;
  }
  next();
});

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/donor", donorRouter);
app.use("/", donationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
