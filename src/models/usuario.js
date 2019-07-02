const helpers = require('../helpers/helpers.js');

let usuario = function() {};

usuario.prototype.show = function(req, res) {
  console.log('ver model');
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios WHERE permissao!='a';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//acho que não vai ter necessidade
usuario.prototype.showMed = function(req, res) {
  let sql = `SELECT m.*, es.Uf, e.especialidade, u.* FROM usuarios u JOIN medicos m on m.idUsuario = u.id
  JOIN especialidades e ON m.idEspecialidade = m.id JOIN estados es ON m.emissor= es.id;`
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//acho que não vai ter necessidade
usuario.prototype.showPac = function(req, res) {
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.get = function(req, res) {
  let filter = "";
  if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

usuario.prototype.getLogin = function(req, res) {
  let login = req.body.usuario;
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios WHERE login='${login}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

usuario.prototype.create = function(req, res) {
  let login = req.body.usuario;
  let senhaHash = req.body.senha;
  // let senhaHash = helpers.generateHash(req.body.senha);
  let tipo = 'p'.toUpperCase();//req.body.typeUser;
  if(typeUser) tipo = req.body.typeUser.toUpperCase();
  
  let sql = `INSERT INTO usuarios (login, senha, permissao) VALUES ('${login}','${senhaHash}','${tipo}');` 
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.login = function(req, res) {
  let login = req.body.usuario;
  let senhaHash = req.body.senha;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM usuarios WHERE login='${login}' AND senha='${senhaHash}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.update = function(req, res) {
  console.log('usuario ',req.login);
  const id = parseInt(req.id);   let login = req.login;   let senhaHash = req.senha;
  let sql = `UPDATE usuarios SET login = '${login}', senha = '${senhaHash}' WHERE id = ${id};`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

usuario.prototype.remove = function(req, res) {
  console.log(req);
  const id = parseInt(req);//req = id
  let sql = `DELETE FROM usuarios WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new usuario();
