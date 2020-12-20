const Doctor = require('../../models/Doctor');

async function CreateDoctor ({name, cpf, crm, birth, user_id}, transaction) {
  
  const doctor = await Doctor.create({name, cpf, crm, birth, user_id}, {transaction});

  return doctor;

}

module.exports = CreateDoctor;
