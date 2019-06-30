const helpers = require("../helpers/helpers");

let atendimentos = function() {};

atendimentos.prototype.show = function(req, res) {
  console.log('ver atendimentos');
  sql = `SELECT p.nome as pac, p.cpf, m.nome as med, m.crm, m.emissor, c.dia, c.horario FROM medicos m JOIN atendimentos c ON m.id = c.idMedico JOIN pacientes p ON p.id = c.idPaciente ORDER BY med, pac, c.dia, c.horario;`;
    
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

atendimentos.prototype.showUsuario = function(req, res) {
  console.log('ver atendimentos \n tipo', req.params.type,' \n id - ', req.params.id);//incluir condição para permissão
  let filter = "";
  let column = "";
  
  if(req.params.type == 'm'){
    column ="p.nome as pacientes, p.cpf, p.sexo,";//, p.nascimento,";
    if(req.params.id)
    filter = "WHERE m.id = "+parseInt(req.params.id); 
  
  }else if(req.params.type == 'p') {
    column = "m.nome as medicos, m.crm, m.emissor, e.especialidade,";
    if(req.params.id)
      filter = "WHERE p.id ="+parseInt(req.params.id); 
  
  }else column = "p.nome as paciente, p.cpf, p.sexo, m.nome as medico, m.crm, m.emissor, e.especialidade, ";

  sqlShowPac = `SELECT ${column} c.dia, c.horario FROM atendimentos c JOIN medicos m ON m.id = c.idMedico JOIN especialidades e ON m.idEspecialidade = e.id JOIN pacientes p ON p.id = c.idPaciente ${filter} ORDER BY c.dia, c.horario;`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sqlShowPac, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

atendimentos.prototype.get = function(req, res) {
  console.log('ver atendimentos unico/varios');
  return new Promise((resolve, reject) => {
    let filter = "";
    if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
    helpers.execNoPromise(`SELECT * FROM atendimentos `+ filter, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

atendimentos.prototype.create = function(req, res) {
  console.log('criando atendimentos pacientes');
  let data = req.body.data;
  let horario = req.body.horario;
  let idMedico = parseInt(req.body.idMed);
  let idPaciente = parseInt(req.body.idPac);//pegar pelo parametros
  // helpers.execNoPromise(`INSERT INTO atendimentos (data, horario, idMedico, idPaciente) VALUES ('${data}','${horario}','${idMedico}','${idPaciente}','${especialidade}', LAST_INSERT_ID());`, (error, results) => {
     
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO atendimentos (dia, horario, idMedico, idPaciente) VALUES ('${data}','${horario}','${idMedico}','${idPaciente}');`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//?
atendimentos.prototype.update = function(req, res) {
  const id = parseInt(req.params.id);
  let data = req.body.data;
  let horario = req.body.horario;
  let idMedico = parseInt(req.body.idMed);
  let idPaciente = parseInt(req.body.idPac);//pegar pelo parametros
  
  let sql = `UPDATE atendimentos SET dia='${data}', horario='${horario}', idMedico='${idMedico}', idPaciente='${idPaciente}' WHERE id='${id}';`;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//?
atendimentos.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(
      `DELETE FROM atendimentos WHERE id=` + parseInt(req.params.id),
      (error, results) => {
        if (error) return reject(error);
        else resolve(results);
      }
    );
  });
};

module.exports = new atendimentos();
