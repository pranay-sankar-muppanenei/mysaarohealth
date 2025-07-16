const express = require('express');
const fileUploaderUtil = require('../utils/fileUploader');
const fileUploaderController = require('../controllers/fileUploader.controller');

const fileUploader = express.Router({ mergeParams: true });

fileUploader.post(
  '/upload',
  fileUploaderController.uploadFile,
);

fileUploader.get(
  '/:type',
  fileUploaderController.getFilesByPatientId
)

module.exports = fileUploader;
