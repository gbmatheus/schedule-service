const helpers = require("../helpers/helpers.js");

let usuario = function() {};

usuario.prototype.get = function(req, res, callback) {
  // usuario.prototype.login = function (user, res, callback) {
  let login = req.body.login;
  let password = req.body.senha;
  
  console.log('teste req - ',req.body);
  console.log('teste req params',req.params);
  
  helpers.execSqlQuery(
    `SELECT * FROM usuarios WHERE login='${login}' AND senha='${password}'`,
    res
  );
};

usuario.prototype.create = function(req, res, callback) {
  let login = req.body.login//.substring(0, 50);
  let password = req.body.senha//.substring(0, 30);
  let tipo = req.body.tipo//.substring(0, 30);

  helpers.execSqlQuery(
    `INSERT INTO usuarios (login, senha, tipo) VALUES ('${login}','${password}','${tipo}');`,
    res
  );
};

usuario.prototype.show = function(req, res, callback) {
  // usuario.prototype.login = function (user, res, callback) {
  helpers.execSqlQuery("SELECT * FROM usuarios", res);
  
};

module.exports = new usuario();
