const Doctor = require('../models/Doctor');
const User = require('../models/User');
const CreateDoctor = require('../services/Doctor/CreateDoctorService');

module.exports = {
  
  async index (req, res) {
    const doctors = await Doctor.findAll();

    return doctors;
  },
  
  async store (req, res) {
    const { username, email, password } = req.body;
    const { name, cpf, crm, birth } = req.body;

    const user = await User.create({ username, email, password });

    const doctor = await CreateDoctor({ name, cpf, crm, birth },);

  },

}