var express = require("express");
var router = express.Router();
const usersController = require("../controller/users");

// User home page
router.get("/", usersController.isAuth, function (req, res, next) {
  const username = req.query.username;
  context = { isLoggedIn: true, username: username };
  res.render("index", context);
});

module.exports = router;
