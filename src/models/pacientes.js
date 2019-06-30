const helpers = require("../helpers/helpers.js");

let pacientes = function() {};

//Retorna todos os pacientes
pacientes.prototype.show = function(req, res) {
  let sql = `SELECT p.*, e.Uf, u.login, u.senha FROM pacientes p JOIN usuarios u ON p.idUsuario = u.id JOIN estados e ON p.idUf = e.id ORDER BY p.id;`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//Retorna um paciente
pacientes.prototype.get = function(req, res) {
  let sql = `SELECT p.*, e.Uf, u.login, u.senha FROM pacientes p JOIN usuarios u ON p.idUsuario = u.id JOIN estados e ON p.idUf = e.id WHERE p.id = '${parseInt(req.params.id)}' ORDER BY p.nome` ;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Cria
pacientes.prototype.create = function(req, res) {
  let nome = req.body.nome.toLowerCase();   let cpf = req.body.cpf.replace(/[^\d]+/g,'');   let sexo = req.body.sexo.toUpperCase();   let nascimento = req.body.nascimento;   let telefone = req.body.telefone;   let celular = req.body.celular;   let email = req.body.email.toLowerCase();   let endereco = req.body.endereco.toLowerCase();   let numero = parseInt(req.body.numero);   let bairro = req.body.bairro.toLowerCase();   let cep = req.body.cep.replace(/[^\d]+/g,'');   let cidade = req.body.cidade.toLowerCase();   let uf = req.body.uf;

  let sql = `INSERT INTO pacientes (nome, cpf, sexo, nascimento, idUsuario, conTelefone, conCelular, conEmail, endLogradouro, endNumero, endBairro, endCep, endCidade, idUF) VALUES ('${nome}','${cpf}','${sexo}','${nascimento}', LAST_INSERT_ID(), '${telefone}','${celular}','${email}','${endereco}','${numero}', '${bairro}','${cep}','${cidade}','${uf}');`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//Atualiza
pacientes.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  let nome = req.body.nome.toLowerCase();   let cpf = req.body.cpf.replace(/[^\d]+/g,'');   let sexo = req.body.sexo.toUpperCase();   let nascimento = req.body.nascimento;   let telefone = req.body.telefone;   let celular = req.body.celular;   let email = req.body.email.toLowerCase();   let endereco = req.body.endereco.toLowerCase();   let numero = parseInt(req.body.numero);   let bairro = req.body.bairro.toLowerCase();   let cep = req.body.cep.replace(/[^\d]+/g,'');   let cidade = req.body.cidade.toLowerCase();   let uf = req.body.uf;

  let sql = `UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}', nascimento='${nascimento}', conTelefone='${telefone}', conCelular='${celular}', conEmail='${email}', endLogradouro='${endereco}', endNumero='${numero}', endBairro='${bairro}', endCep='${cep}', endCidade='${cidade}', idUF='${uf}' WHERE id='${id}';` //and cpf = ${cpf};

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//Deleta
pacientes.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM pacientes WHERE id=` + parseInt(req.params.id), (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new pacientes();
