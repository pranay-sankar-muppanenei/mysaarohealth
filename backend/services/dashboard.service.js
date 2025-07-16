const Invoice = require('../models/invoice');
const Appointment = require('../models/appointment');
const Prescription = require('../models/prescription');
const DoctorPatient = require('../models/doctorPatient');

const getPatient24HourReport = async (doctorId) => {
  try {
    const now = new Date();
    const past24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const patients = await DoctorPatient.find({
      doctorId,
      createdAt: { $gte: past24Hours }
    }).sort({ createdAt: 1 });

    const hourlyReport = new Array(24).fill(0);
    patients.forEach(patient => {
      const patientHour = Math.floor((patient.createdAt - past24Hours) / (60 * 60 * 1000));
      if (patientHour >= 0 && patientHour < 24) {
        hourlyReport[patientHour]++;
      }
    });

    return {
      statusCode: 200,
      patients: hourlyReport,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const getPatient30DaysReport = async (doctorId) => {
  try {
    const now = new Date();
    const past30Days = new Date();
    past30Days.setDate(now.getDate() - 30);

    const patients = await DoctorPatient.find({
      doctorId,
      createdAt: { $gte: past30Days }
    }).sort({ createdAt: 1 });

    const dailyReport = new Array(30).fill(0);

    patients.forEach(patient => {
      const patientDate = new Date(patient.createdAt);
      const dayIndex = Math.floor((patientDate - past30Days) / (24 * 60 * 60 * 1000));

      if (dayIndex >= 0 && dayIndex < 30) {
        dailyReport[dayIndex]++;
      }
    });

    return {
      statusCode: 200,
      patients: dailyReport,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const getInvoice12MonthsReport = async (doctorId) => {
  try {
    const now = new Date();
    const past12Months = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const invoices = await Invoice.find({
      doctorId,
      createdAt: { $gte: past12Months },
    }).sort({ createdAt: 1 });

    const monthlyReport = new Array(12).fill(0);

    invoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.createdAt);
      const yearDifference = invoiceDate.getFullYear() - past12Months.getFullYear();
      const monthDifference = invoiceDate.getMonth() - past12Months.getMonth();
      const monthIndex = yearDifference * 12 + monthDifference;

      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyReport[monthIndex]++;
      }
    });

    return {
      statusCode: 200,
      invoices: monthlyReport,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const getPayment12MonthsReport = async (doctorId) => {
  try {
    const now = new Date();
    const past12Months = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const invoices = await Invoice.find({
      doctorId,
      createdAt: { $gte: past12Months },
    }).sort({ createdAt: 1 });

    const monthlyReport = new Array(12).fill(0);

    invoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.createdAt);
      const yearDifference = invoiceDate.getFullYear() - past12Months.getFullYear();
      const monthDifference = invoiceDate.getMonth() - past12Months.getMonth();
      const monthIndex = yearDifference * 12 + monthDifference;

      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyReport[monthIndex] += invoice.totalAmount ? invoice.totalAmount : 0;
      }
    });

    return {
      statusCode: 200,
      payments: monthlyReport,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

const getComparisonData = async (doctorId) => {
  try {
    const { start: thisMonthStart, end: thisMonthEnd } = getDateRange();
    const { start: lastMonthStart, end: lastMonthEnd } = getDateRange(-1);

    const [thisMonthInvoices, lastMonthInvoices] = await Promise.all([
      Invoice.countDocuments({ createdAt: { $gte: thisMonthStart, $lt: thisMonthEnd } }),
      Invoice.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } }),
    ]);

    const [thisMonthPrescriptions, lastMonthPrescriptions] = await Promise.all([
      Prescription.countDocuments({ createdAt: { $gte: thisMonthStart, $lt: thisMonthEnd } }),
      Prescription.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } }),
    ]);

    const [thisMonthDoctorPatients, lastMonthDoctorPatients] = await Promise.all([
      DoctorPatient.countDocuments({ createdAt: { $gte: thisMonthStart, $lt: thisMonthEnd }, doctorId }),
      DoctorPatient.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd }, doctorId }),
    ]);

    const [thisMonthAppointments, lastMonthAppointments] = await Promise.all([
      Appointment.countDocuments({ createdAt: { $gte: thisMonthStart, $lt: thisMonthEnd }, doctorId }),
      Appointment.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd }, doctorId }),
    ]);

    return {
      statusCode: 200,
      data: {
        invoices: { thisMonth: thisMonthInvoices, lastMonth: lastMonthInvoices },
        prescriptions: { thisMonth: thisMonthPrescriptions, lastMonth: lastMonthPrescriptions },
        doctorPatients: { thisMonth: thisMonthDoctorPatients, lastMonth: lastMonthDoctorPatients },
        appointments: { thisMonth: thisMonthAppointments, lastMonth: lastMonthAppointments },
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
}

const getDateRange = (monthOffset = 0) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 1);
  return { start, end };
};

module.exports = {
  getPatient24HourReport,
  getPatient30DaysReport,
  getInvoice12MonthsReport,
  getPayment12MonthsReport,
  getComparisonData,
};
