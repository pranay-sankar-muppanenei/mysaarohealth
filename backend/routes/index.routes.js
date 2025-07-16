const express = require('express');

const doctorRoutes = require('./doctor.routes');
const patientRoutes = require('./patient.routes');
const invoiceRoutes = require('./invoice.routes');
const libraryRoutes = require('./library.routes');
const dashboardRoutes = require('./dashboard.routes');
const fileUploader = require('./fileUploader.routes');
const appointmentRoutes = require('./appointment.routes');
const prescriptionRoutes = require('./prescription.routes');
const medicineLibraryRoutes = require('./medicineLibrary.routes');
const templateLibraryRoutes = require('./templateLibrary.routes');
const dropdownLibraryRoutes = require('./dropdownLibrary.routes');
const doctorProfileRoutes = require('../routes/doctorProfile.routes');
const patientAppointmentRoutes = require('../routes/patientAppointment.routes');
const prescriptionSectionRoutes = require('../routes/prescriptionSection.routes');
const doctorMiddleware = require('../middlewares/doctor.middleware');

const router = express.Router();

// Centralizing all the routes in one file
router.use(
  '/doctor',
  doctorRoutes,
);

router.use(
  '/:doctorId/doctor-profile',
  doctorMiddleware,
  doctorProfileRoutes,
);

router.use(
  '/:doctorId/patient',
  patientAppointmentRoutes,
)

router.use(
  '/appointment',
  appointmentRoutes,
);

router.use(
  '/patient',
  patientRoutes,
);

router.use(
  '/:doctorId/report',
  doctorMiddleware,
  dashboardRoutes,
);

router.use(
  '/:doctorId/invoice',
  doctorMiddleware,
  invoiceRoutes,
);

router.use(
  '/:doctorId/prescription/:patientId',
  doctorMiddleware,
  prescriptionRoutes,
);

router.use(
  '/:patientId/file',
  fileUploader,
);

router.use(
  '/:doctorId/medicine',
  doctorMiddleware,
  medicineLibraryRoutes,
);

router.use(
  '/:doctorId/template',
  doctorMiddleware,
  templateLibraryRoutes,
);

router.use(
  '/library',
  libraryRoutes,
);

router.use(
  '/:doctorId/dropdown',
  doctorMiddleware,
  dropdownLibraryRoutes,
);

router.use(
  '/:doctorId/prescription-section',
  doctorMiddleware,
  prescriptionSectionRoutes,
);

module.exports = router;
