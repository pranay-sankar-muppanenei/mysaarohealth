const invoiceService = require('../services/invoice.service');
const { fileUploader, uploadPatientRecords } = require('../utils/fileUploader');
const FileUploader = require('../models/fileUploader');
const Prescription = require('../models/prescription');

const uploadFile = async (req, res) => {
  fileUploader(req, res);
  // uploadPatientRecords(req, res);
}

const getFilesByPatientId = async (req, res) => {
  try {
    const { patientId, type } = req.params;

    let data = {};
    if (
      type === 'health'
      || type === 'ipd'
    ) {
      data = await FileUploader.find({
        patientId,
        type,
      }).sort({ updatedAt: -1 });
    } else if (type === 'prescription') {
      data = await Prescription.find({
        patientId,
      }).sort({ updatedAt: -1 });
    }

    res
      .status(200)
      .json({
        files: data,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  uploadFile,
  getFilesByPatientId,
};
