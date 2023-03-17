const express = require("express");
const router = express.Router();
const donorController = require("../controller/donor");
const usersController = require("../controller/users");

router.get( "/", usersController.isAuth, usersController.isAdmin, donorController.index); 
router.post("/", usersController.isAuth, donorController.create);

router.get("/new", usersController.isAuth, donorController.new); 
router.delete("/:id", usersController.isAuth, usersController.isAdmin, donorController.delete);
router.get("/:id", usersController.isAuth, usersController.isAdmin, donorController.edit);
router.put("/:id", usersController.isAuth, usersController.isAdmin, donorController.update);

module.exports = router;
