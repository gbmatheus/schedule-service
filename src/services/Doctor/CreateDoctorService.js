const Doctor = require('../../models/Doctor');

async function CreateDoctor ({name, cpf, crm, birth, user_id}, {transaction}) {
  
  const doctorByCrmExist = await Doctor.findOne({where: {crm}});

  if(doctorByCrmExist) {
    throw new Error('This crm is already in use');
  }
  
  const doctor = await Doctor.create({name, cpf, crm, birth, user_id}, {transaction});

  return doctor;

}

module.exports = CreateDoctor;
