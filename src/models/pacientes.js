const helpers = require("../helpers/helpers.js");

let pacientes = function() {};

pacientes.prototype.get = function(req, res, callback) {
  let filter = "";
  if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
  helpers.execSqlQuery("SELECT * FROM pacientes " + filter + ";", res);

  console.log("Função get!");
};

pacientes.prototype.create = function(req, res, callback) {
  console.log("Função create 1", req.body.nome);
  console.log("Função create 2 ", req.params.nome);

  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  const sexo = req.body.sexo.substring(0, 1);

  helpers.execSqlQuery(
    `INSERT INTO pacientes (nome, cpf, sexo) VALUES ('${nome}','${cpf}','${sexo}');`,
    res
  );

  // console.log("Função create 1", req.body.nome);
  // console.log("Função create 2 ", req.params.nome);
};

pacientes.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  const sexo = req.body.sexo.substring(0, 1);

  helpers.execSqlQuery(
    `UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}' WHERE id=${id};`,
    res
  );

  console.log("Função update");
};

pacientes.prototype.remove = function(req, res, callback) {
  helpers.execSqlQuery(
    "DELETE FROM pacientes WHERE id=" + parseInt(req.params.id) + ";",
    res
  );

  console.log("Função delete!");
};

module.exports = new pacientes();
