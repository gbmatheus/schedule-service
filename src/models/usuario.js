const bcrypt = require("bcryptjs");

const helpers = require("../helpers/helpers.js");

let usuario = function() {};

//Cria usuario
usuario.prototype.create = function(req, res) {
  let sql = `INSERT INTO usuarios (login, password, email, typeUser) VALUES ('${req.login}','${req.password}', '${req.email}','${req.typeUser}');`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Retorna a existencia do login
usuario.prototype.login = function(req, res) {
  let sql = `SELECT * FROM usuarios WHERE login='${req.login}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
        if (error) return reject(error);
        else resolve(results);
    });
  });
};

//Atualizar usuario
usuario.prototype.update = function(req, res) {
  const id = parseInt(req.id);
  let user = req.user;
  let password = req.password;
  let sql = `UPDATE usuarios SET user = '${user}', password = '${password}' WHERE id = ${id};`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Remover usuario
usuario.prototype.remove = function(req, res) {
  console.log(req);
  const id = parseInt(req); //req = id
  let sql = `DELETE FROM usuarios WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Ativar/Inativar usuario
usuario.prototype.activate = function(req, res) {
  const id = parseInt(req.id);
  let active = req.active;
  let sql = `UPDATE usuarios SET user = '${user}', senha = '${senhaHash}' WHERE id = ${id};`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

module.exports = new usuario();
