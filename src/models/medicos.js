const helpers = require("../helpers/helpers.js");

let medicos = function() {};

medicos.prototype.show = function(req, res) {;
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM medicos;`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

medicos.prototype.get = function(req, res) {
  return new Promise((resolve, reject) => {
    let filter = "";
    if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
    helpers.execNoPromise(`SELECT * FROM medicos '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

medicos.prototype.create = function(req, res) {
  let nome = req.body.nome;   let crm = req.body.crm;   let emissor = req.body.emissor;   let nascimento = req.body.nascimento;   let especialidade = req.body.especialidade;   let telefone = req.telefone;   let celular = req.body.celular;   let email = req.body.email;

  let sql = `INSERT INTO medicos (nome, crm, emissor, nascimento, idEspecialidade, idUsuario, conTelefone, conTelefoneCel, conEmail) VALUES ('${nome}','${crm}','${emissor}','${nascimento}','${especialidade}',LAST_INSERT_ID(),'${telefone}','${celular}','${email}');`
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO medicos (nome, cpf, sexo, nascimento, idUsuario) VALUES ('${nome}','${cpf}','${sexo}','${nascimento}', LAST_INSERT_ID());`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

medicos.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  let nome = req.body.nome;   let crm = req.body.crm;   let emissor = req.body.emissor;   let nascimento = req.body.nascimento;   let especialidade = req.body.especialidade;   let telefone = req.telefone;   let celular = req.body.celular;   let email = req.body.email;

  let sql = `UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}', especialidade='${especialidade}', conTelefone='${telefone}', conTelefoneCel='${celular}', conEmail='${email}' WHERE id='${id}';`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}' WHERE id='${id}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

medicos.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM medicos WHERE id=` + parseInt(req.params.id), (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new medicos();
