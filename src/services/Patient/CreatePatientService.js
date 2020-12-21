const Patient = require('../../models/Patient');

async function CreatePatient ({name, cpf, birth, genre,  user_id }, {transaction}) {
  
  const patientByCpfExist = await Patient.findOne({ 
    where: { cpf }
  });

  if(patientByCpfExist) {
    throw Error('This cpf is already register');
  
  }

  const patient = await Patient.create({
    name, cpf, birth, genre, user_id
  },{transaction})

  return patient;

}

module.exports = CreatePatient;