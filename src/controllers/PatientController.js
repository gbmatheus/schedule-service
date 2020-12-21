const sequelize  = require('../database')

const PatientCreate = require('../services/Patient/CreatePatientService');
const UserCreate = require('../services/User/CreateUserService');

module.exports = {
  
  async index (req, res) {
    const patients = await Patient.findAll();

    return res.json(patients);
  },

  async store (req, res) {
    const {username, email, password} = req.body;
    const {name, cpf, birth, genre} = req.body;
    
    const t = await sequelize.transaction();

    try {
      
      
        const user = await UserCreate({
          username, email, password
        },{transaction:t});
      
        if(!user){
          return res.json({ error: 'User not register' });
        }

        const patient = await PatientCreate({
          name, cpf, birth, genre, user_id: user.id
        }, {transaction:t})

        await t.commit();

        return res.status(201).json(patient);
      
    
    } catch (err) {
      
      await t.rollback();

      res.status(400).json({error: err.message});
          
    }

  }

}