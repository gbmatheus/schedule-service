const sequelize = require('../database');

const Doctor = require('../models/Doctor');
const User = require('../models/User');
const CreateDoctor = require('../services/Doctor/CreateDoctorService');

module.exports = {

  async index (req, res) {
    const doctors = await Doctor.findAll();

    return res.json(doctors);
  },
  
  async store (req, res) {
    const { username, email, password } = req.body;
    const { name, cpf, crm, birth } = req.body;

    const t = await sequelize.transaction();

    try {

      const userByEmailExist = await User.findOne({where: { email }});
      
      if(userByEmailExist) {
        return res.status(400).json({ error: 'This email is already in use'});
      }

      const user = await User.create({ username, email, password }, {transaction: t});
      console.log(user.id);

      if(!user) {
        return res.status(500).json({error: 'User not register'});
      }

      const doctor = await CreateDoctor({ 
        name, cpf, crm, birth, user_id: user.id 
      },{transaction: t});

      await t.commit();
      return res.status(201).json(doctor);

    } catch (err) {
      await t.rollback();
      return res.status(400).json({ error: err.message});
    }

  },

}