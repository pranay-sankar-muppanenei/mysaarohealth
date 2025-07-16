const mongoose = require('mongoose');

const fileUploaderSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
      unique: true,
    },
    patientId: {
      index: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FileUploader = mongoose.model('FileUploader', fileUploaderSchema);
module.exports = FileUploader;
