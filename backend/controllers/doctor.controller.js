const doctorService = require('../services/doctor.service');

const registerDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    const doctor = await doctorService.registerDoctor(doctorData);
    if (doctor?.error) {
      return res
        .status(doctor.statusCode)
        .send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ doctor: doctor.doctor });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const loginDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    const doctor = await doctorService.loginDoctor(doctorData);
    if (doctor?.error) {
      return res
        .status(doctor.statusCode)
        .send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ doctor: doctor.doctor });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorService.getDoctor(doctorId);
    if (doctor?.error) {
      return res
        .status(doctor.statusCode)
        .send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ doctor: doctor.doctor });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorService.deleteDoctor(doctorId);
    if (doctor?.error) {
      return res
        .status(doctor.statusCode)
        .send(doctor.error);
    }

    res
      .status(doctor.statusCode)
      .json({ message: 'Doctor deleted successfully' });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  registerDoctor,
  loginDoctor,
  getDoctor,
  deleteDoctor,
};
