const helpers = require("../helpers/helpers.js");

let medicos = function() {};

medicos.prototype.get = function(req, res, callback) {
  let filter = "";
  if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
  helpers.execSqlQuery("SELECT * FROM medico " + filter + ";", res);
};

medicos.prototype.create = function(req, res, callback) {
  const nome = req.body.nome.substring(0, 150);
  const crm = req.body.crm.substring(0, 10);
  const emisor = req.body.emisor.substring(0, 2);

  helpers.execSqlQuery(
    `INSERT INTO medico (nome, crm, emisor) VALUES ('${nome}','${crm}','${emisor}');`,
    res
  );
};

medicos.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0, 150);
  const crm = req.body.crm.substring(0, 10);
  const emisor = req.body.emisor.substring(0, 2);

  helpers.execSqlQuery(
    `UPDATE medico SET nome='${nome}', crm='${crm}', emisor='${emisor}' WHERE id=${id};`,
    res
  );
};

medicos.prototype.remove = function(req, res, callback) {
  helpers.execSqlQuery(
    "DELETE FROM medico WHERE id=" + parseInt(req.params.id) + ";",
    res
  );
};

module.exports = new medicos();
