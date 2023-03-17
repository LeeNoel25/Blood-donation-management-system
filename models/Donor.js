const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const donationSchema = new Schema(
  {
    remarks: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      min: 350,
      max: 450,
      required: false,
    },
  },
  { timestamps: true }
);

const donorSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  donation: [donationSchema],
});

const Donor = model("Donor", donorSchema);
module.exports = Donor;
