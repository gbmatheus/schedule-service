const helpers = require("../helpers/helpers.js");

let medicos = function() {};

medicos.prototype.get = function(req, res) {
  console.log('ver medicos unico/varios');
  return new Promise((resolve, reject) => {
    let filter = "";
    if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
    helpers.execNoPromise(`SELECT * FROM medicos '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

medicos.prototype.ver = function(req, res) {
  console.log('ver medicos');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM medicos;`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

medicos.prototype.criar = function(req, res) {
  console.log('criando medico');
  let nome = req.body.nome;
  let crm = req.body.crm;
  let emissor = req.body.emissor;
  let nascimento = req.body.nascimento;
  let especialidade = req.body.especialidade;
  // idUsuario int(11)
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO medicos (nome, crm, emissor, nascimento, idEspecialidade, idUsuario) VALUES ('${nome}','${crm}','${emissor}','${nascimento}','${especialidade}', LAST_INSERT_ID());`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

medicos.prototype.atualizar = function(req, res) {
  console.log('atualizar medico');
  let nome = req.body.nome;
  let crm = req.body.crm;
  let emissor = req.body.emissor;
  let nascimento = req.body.nascimento;
  let especialidade = req.body.especialidade;
  // idUsuario int(11)

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}', especialidade='${especialidade}' WHERE id='${id}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })  
};

medicos.prototype.remover = function(req, res) {
  console.log('deletar medico');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM medicos WHERE id=` + parseInt(req.params.id), (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new medicos();
