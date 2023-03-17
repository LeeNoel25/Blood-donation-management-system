const User = require("../models/user");
const bcrypt = require("bcrypt");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
const saltRounds = 10;

function newUser(req, res) {
  const isLoggedIn = false;
  res.render("users/register", { isLoggedIn });
}

async function create(req, res, next) {
  try {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      username: req.body.username,
      password,
    });
    res.status(201).render("users/login", {
      msg: "",
    });
  } catch (error) {
    return next(error);
  }
}

const login = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const isLoggedIn = false;
  res.render("users/login", { msg: "", isLoggedIn });
};

async function signIn(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    const context = { msg: "Incorrect login details" };
    res.render("users/login", context);
    return;
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userId = user._id;
      req.session.isLoggedIn = true;
      req.session.username = username;
      if (user.username === "Admin") {
        return res.redirect("/donor");
      }
      res.redirect(`/?username=${username}`);
    } else {
      const context = { msg: "Incorrect Password" };
      res.render("users/login", context);
    }
  });
}

const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy();
    console.log("Session ended");
  }
  res.render("users/login", { msg: "", isLoggedIn: false });
};

const isAuth = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId).exec();
    res.locals.user = user;
    isLoggedIn = true;
    next();
  } else {
    res.status(403).redirect("/user/login");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.username !== "Admin") {
      return res.redirect("/login");
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  newUser,
  create,
  login,
  signIn,
  logout,
  isAuth,
  isAdmin,
};
