const helpers = require("../helpers/helpers");

let atendimentos = function() {};

//INSERT INTO `agendador`.`atendimentos` (`data`, `horario`, `idMedico`, `idPaciente`) VALUES ('123', '123', '1', '2');
// select c.dataC, c.hora, m.nome, m.crm, m.emissor, p.nome, p.cpf from medico m
// join consultas c 
// on m.id = c.idMed
// join pacientes p 
// on p.id = c.idPac
// order by m.nome;

// SELECT c.dataC, c.hora, m.nome, m.crm, m.emissor, p.nome, p.cpf FROM medico m
// JOIN consultas c 
// ON m.id = c.idMed
// JOIN pacientes p 
// ON p.id = c.idPac
// ORDER BY c.dataC, c.hora;

atendimentos.prototype.show = function(req, res) {
  console.log('ver atendimentos');
  sql = `SELECT p.nome as pac, p.cpf, m.nome as med, m.crm, m.emissor, c.dataC, c.hora FROM medico m JOIN consultas c ON m.id = c.idMed JOIN pacientes p ON p.id = c.idPac ORDER BY c.dataC, c.hora;`;
    
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else { console.log(results); resolve(results)};
    });
  })
};

atendimentos.prototype.showAtendimentos = function(id, res) { id=1;
  console.log('ver atendimentos - medicos');//incluir condição para permissão
  sqlShowPac = `SELECT c.dataC, c.hora, m.nome as nome_medico, m.crm, m.emissor, p.nome, p.cpf FROM medico m JOIN consultas c ON m.id = c.idMed JOIN pacientes p ON p.id = c.idPac WHERE m.id = '${id}' ORDER BY c.dataC, c.hora;`

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
    helpers.execNoPromise(`SELECT * FROM atendimentos '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

atendimentos.prototype.create = function(req, res) {
  console.log('criando atendimentos pacientes');
  let data = req.body.data;
  let horario = req.body.hora;
  let idMedico = parseInt(req.body.idMed);
  let idPaciente = parseInt(req.body.idPac);
  // helpers.execNoPromise(`INSERT INTO atendimentos (data, horario, idMedico, idPaciente) VALUES ('${data}','${horario}','${idMedico}','${idPaciente}','${especialidade}', LAST_INSERT_ID());`, (error, results) => {
     
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO consultas (dataC, hora, idMed, idPac) VALUES ('${data}','${horario}','${idMedico}','${idPaciente}');`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new atendimentos();
