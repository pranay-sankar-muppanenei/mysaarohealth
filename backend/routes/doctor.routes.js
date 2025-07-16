const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const doctorMiddleware = require('../middlewares/doctor.middleware');

const doctor = express.Router({ mergeParams: true });

doctor.post(
  '/',
  doctorController.registerDoctor,
);

doctor.post(
  '/access-token',
  doctorController.loginDoctor,
);

doctor.get(
  '/:doctorId',
  doctorMiddleware,
  doctorController.getDoctor,
);

doctor.delete(
  '/:doctorId',
  doctorMiddleware,
  doctorController.deleteDoctor,
);

module.exports = doctor;
