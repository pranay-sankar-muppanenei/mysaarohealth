const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    rmcNumber: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: String,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    address: {
      required: true,
      type: String,
    },
    clinicName: {
      type: String,
      default: null,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
