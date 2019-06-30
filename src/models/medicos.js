const helpers = require("../helpers/helpers.js");

let medicos = function() {};
//OK
medicos.prototype.show = function(req, res) {
  let sql = `SELECT m.*, uf.Uf, e.especialidade, u.login, u.senha FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.id JOIN estados uf ON m.emissor= uf.id JOIN usuarios u ON u.id = m.idUsuario`;
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};
//?
medicos.prototype.get = function(req, res) {
  let filter = "";
  if (req.params.id) filter = 'WHERE m.id=' + parseInt(req.params.id);
  let sql = `SELECT m.*, uf.Uf, e.especialidade, u.login, u.senha FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.id JOIN estados uf ON m.emissor= uf.id JOIN usuarios u ON u.id = m.idUsuario `+ filter;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};
//OK
medicos.prototype.create = function(req, res) {
  let nome = req.body.nome.toLowerCase();
  let crm = parseInt(req.body.crm);
  let emissor = parseInt(req.body.emissor);
  let nascimento = req.body.nascimento;
  let especialidade = parseInt(req.body.especialidade);
  let telefone = req.body.telefone;
  let celular = req.body.celular;
  let email = req.body.email.toLowerCase();

  let sql = `INSERT INTO medicos (nome, crm, emissor, nascimento, idEspecialidade, idUsuario, conTelefone, conCelular, conEmail) VALUES ('${nome}','${crm}','${emissor}','${nascimento}','${especialidade}',LAST_INSERT_ID(),'${telefone}','${celular}','${email}');`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};
//?
medicos.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  let nome = req.body.nome;
  let crm = req.body.crm;
  let emissor = req.body.emissor;
  let nascimento = req.body.nascimento;
  let especialidade = parseInt(req.body.especialidade);
  let telefone = req.telefone;
  let celular = req.body.celular;
  let email = req.body.email;

  let sql = `UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}', especialidade='${especialidade}', conTelefone='${telefone}', conCelular='${celular}', conEmail='${email}' WHERE id='${id}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(
      `UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}' WHERE id='${id}';`,
      (error, results) => {
        if (error) return reject(error);
        else resolve(results);
      }
    );
  });
};
//?
medicos.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(
      `DELETE FROM medicos WHERE id=` + parseInt(req.params.id),
      (error, results) => {
        if (error) return reject(error);
        else resolve(results);
      }
    );
  });
};

module.exports = new medicos();
