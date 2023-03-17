const Donor = require("../models/Donor");
const User = require("../models/user");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

function newDonor(req, res) {
  res.render("donors/new");
}

const create = (req, res) => {
  req.body.name = req.body.name.trim();
  const donor = new Donor(req.body);
  donor
    .save()
    .then(async (savedDonor) => {
      console.log(savedDonor);
      console.log(req.session);
      try {
        const user = await User.findById(req.session.userId);
        if (!user || user.username !== "Admin") {
          res.redirect("/");
        } else {
          res.redirect("/donor");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/donors/new");
    });
};

const index = (req, res) => {
  Donor.find()
    .exec()
    .then((donor) => {
      const context = { donor };
      res.render("donors/index", context);
    });
};

const deleteDonor = (req, res) => {
  const { id } = req.params;
  Donor.findByIdAndDelete(id)
    .exec()
    .then((donor) => {
      res.redirect("/donor");
    });
};

const update = (req, res) => {
  const { id } = req.params;
  req.body.name = req.body.name.trim();
  Donor.findByIdAndUpdate(id, req.body, { new: true })
    .exec()
    .then((donor) => {
      res.redirect("/donor");
    });
};

const edit = (req, res) => {
  const { id } = req.params;
  Donor.findById(id)
    .exec()
    .then((donor) => {
      const context = { id, donor };
      res.render("donors/summary.ejs", context);
    });
};

module.exports = {
  create,
  index,
  delete: deleteDonor,
  new: newDonor,
  update,
  edit,
};
