const express = require("express");
const router = express.Router();
const donationController = require("../controller/donation.js");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const usersController = require("../controller/users");

// Create a new donation
router.post("/donor/:id/donation", usersController.isAuth, usersController.isAdmin, donationController.create);

// Delete a specific donation
router.delete( "/donor/:id/donation/:donation_id", usersController.isAuth, usersController.isAdmin, donationController.delete);

module.exports = router;
