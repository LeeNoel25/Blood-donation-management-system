const Donor = require("../models/Donor");

const deleteDonation = (req, res) => {
  const { id, donation_id } = req.params;
  Donor.findById(id)
    .then((donor) => {
      let donations = donor.donation;
      donations = donations.filter((e) => {
        return e._id.toString() !== donation_id;
      });
      donor.donation = donations;
      return donor.save();
    })
    .then((updatedDonor) => {
      res.redirect(`/donor/${id}`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error deleting donation");
    });
};

const create = (req, res) => {
  console.log(req.body); // logs the request body
  const { "donation[amount]": amount, "donation[remarks]": remarks } = req.body;
  const { id } = req.params;
  if (!amount) {
    return res.status(400).send("Donation amount is required.");
  }
  Donor.findById(id)
    .then((donor) => {
      donor.donation.push({ amount, remarks });
      return donor.save();
    })
    .then((updatedDonor) => {
      res.redirect("/donor");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error creating donation");
    });
};

module.exports = {
  create,
  delete: deleteDonation,
};
