const helpers = require('../helpers/helpers.js');

let usuario = function() {};

usuario.prototype.ver = function(req, res) {
  console.log('ver model');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios WHERE permissao!='a';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.criar = function(req, res) {
  let login = req.body.username;
  let senhaHash = req.body.password;
  // let senhaHash = helpers.generateHash(req.body.password);
  let tipo = req.body.typeUser;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO usuarios (login, senha, permissao) VALUES ('${login}','${senhaHash}','${tipo}');`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.entrar = function(req, res) {
  let login = req.body.username;
  let senhaHash = req.body.password;
  // let senhaHash = helpers.generateHash(req.body.password);

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios WHERE login='${login}' AND senha='${senhaHash}'`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new usuario();
