const helper = require("../helpers/helpers");

let atendimentos = function() {};

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

atendimentos.prototype.ver = function(req, res) {
  console.log('ver atendimentos');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM atendimentos;`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

atendimentos.prototype.criar = function(req, res) {
  console.log('criando atendimentos');
  let data = req.body.data;
  let horario = req.body.horario;
  let idMedico = req.body.idMedico;
  let idPaciente = req.body.idPaciente;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO atendimentos (data, horario, idMedico, idPaciente) VALUES ('${data}','${horario}','${idMedico}','${idPaciente}','${especialidade}', LAST_INSERT_ID());`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new atendimentos();
