var express = require("express");
var router = express.Router();
const usersController = require("../controller/users");

router.get("/register", usersController.newUser);
router.post("/signup", usersController.create);
router.get("/login", usersController.login);
router.post("/login", usersController.signIn);
router.get("/logout", usersController.logout);

module.exports = router;
