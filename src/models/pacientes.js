const helpers = require("../helpers/helpers.js");

let paciente = function() {};

paciente.prototype.get = function(req, res) {
  console.log('ver usuario unico/varios');
  return new Promise((resolve, reject) => {
    let filter = "";
    if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
    helpers.execNoPromise(`SELECT * FROM pacientes '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

paciente.prototype.ver = function(req, res) {
  console.log('ver model');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM pacientes;`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

paciente.prototype.criar = function(req, res) {
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let sexo = req.body.sexo;
  let nascimento = req.body.nascimento;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO pacientes (nome, cpf, sexo, nascimento, idUsuario) VALUES ('${nome}','${cpf}','${sexo}','${nascimento}', LAST_INSERT_ID());`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

paciente.prototype.update = function(req, res, callback) {
  console.log('atualizar paciente');
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const sexo = req.body.sexo;
  const nascimento = req.body.nascimento;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}', nascimento='${nascimento}' WHERE id='${id}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })  

  console.log("Função update");
};

paciente.prototype.remover = function(req, res) {
  console.log('deletar paciente');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM pacientes WHERE id=` + parseInt(req.params.id), (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new pacientes();
