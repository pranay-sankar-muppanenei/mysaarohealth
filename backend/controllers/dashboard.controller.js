const dashboardService = require('../services/dashboard.service');

const getPatient24HourReport = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const patients = await dashboardService.getPatient24HourReport(doctorId);
    if (patients?.error) {
      return res
        .status(patients.statusCode)
        .send(patients.error);
    }

    res
      .status(patients.statusCode)
      .json({ patients: patients.patients });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getPatient30DaysReport = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const patients = await dashboardService.getPatient30DaysReport(doctorId);
    if (patients?.error) {
      return res
        .status(patients.statusCode)
        .send(patients.error);
    }

    res
      .status(patients.statusCode)
      .json({ patients: patients.patients });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getInvoice12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const invoices = await dashboardService.getInvoice12MonthsReport(doctorId);
    if (invoices?.error) {
      return res
        .status(invoices.statusCode)
        .send(invoices.error);
    }

    res
      .status(invoices.statusCode)
      .json({ invoices: invoices.invoices });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getPayment12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const payments = await dashboardService.getPayment12MonthsReport(doctorId);
    if (payments?.error) {
      return res
        .status(payments.statusCode)
        .send(payments.error);
    }

    res
      .status(payments.statusCode)
      .json({ payments: payments.payments });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getComparisonData = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const comparisonData = await dashboardService.getComparisonData(doctorId);
    if (comparisonData?.error) {
      return res
        .status(comparisonData.statusCode)
        .send(comparisonData.error);
    }

    res
      .status(comparisonData.statusCode)
      .json({ comparisonData: comparisonData.data });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  getPatient24HourReport,
  getPatient30DaysReport,
  getInvoice12MonthsReport,
  getPayment12MonthsReport,
  getComparisonData,
};
