const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');

const dashboard = express.Router({ mergeParams: true });

dashboard.get(
  '/patient/24hours',
  dashboardController.getPatient24HourReport,
);

dashboard.get(
  '/patient/30days',
  dashboardController.getPatient30DaysReport,
);

dashboard.get(
  '/invoice/12months',
  dashboardController.getInvoice12MonthsReport,
);

dashboard.get(
  '/payment/12months',
  dashboardController.getPayment12MonthsReport,
);

dashboard.get(
  '/comparison',
  dashboardController.getComparisonData,
);

module.exports = dashboard;
