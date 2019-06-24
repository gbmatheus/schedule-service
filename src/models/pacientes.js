const helpers = require("../helpers/helpers.js");

let paciente = function() {};

paciente.prototype.show = function(req, res) {;
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`SELECT * FROM pacientes;`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

paciente.prototype.get = function(req, res) {
  return new Promise((resolve, reject) => {
    let filter = "";
    if (req.params.id) filter = "WHERE id=" + parseInt(req.params.id);
    helpers.execNoPromise(`SELECT * FROM pacientes '${filter}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

paciente.prototype.create = function(req, res) {
  let nome = req.body.nome;   let cpf = req.body.cpf;   let sexo = req.body.sexo;   let nascimento = req.body.nascimento;   let telefone = req.telefone;   let celular = req.body.celular;   let email = req.body.email;   let endereco = req.body.endereco;   let numero = req.body.numero;   let bairro = req.body.bairro;   let cep = req.body.cep;   let cidade = req.body.cidade;   let uf = req.body.uf;

  let sql = `INSERT INTO pacientes (nome, cpf, sexo, nascimento, idUsuario, endBairro, endCep, endLogradouro, endNumero, conTelefone, conTelefoneCel, conEmail, endCidade, idUF) VALUES ('${nome}','${cpf}','${sexo}','${nascimento}', LAST_INSERT_ID(), '${bairro}','${cep}','${endereco}','${numero}', '${telefone}','${celular}','${email}','${cidade}','${uf}');`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`INSERT INTO pacientes (nome, cpf, sexo, nascimento, idUsuario) VALUES ('${nome}','${cpf}','${sexo}','${nascimento}', LAST_INSERT_ID());`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

paciente.prototype.update = function(req, res, callback) {
  const id = parseInt(req.params.id);
  let nome = req.body.nome;   let cpf = req.body.cpf;   let sexo = req.body.sexo;   let nascimento = req.body.nascimento;   let telefone = req.telefone;   let celular = req.body.celular;   let email = req.body.email;   let endereco = req.body.endereco;   let numero = req.body.numero;   let bairro = req.body.bairro;   let cep = req.body.cep;   let cidade = req.body.cidade;   let uf = req.body.uf;

  let sql = `UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}', nascimento='${nascimento}', endBairro='${bairro}', endCep='${cep}', endLogradouro='${endereco}', endNumero='${numero}', conTelefone='${telefone}', conTelefoneCel='${celular}', conEmail='${email}', endCidade='${cidade}', idUF='${uf}' WHERE id='${id}';`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}', nascimento='${nascimento}' WHERE id='${id}';`, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

paciente.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM pacientes WHERE id=` + parseInt(req.params.id), (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

module.exports = new paciente();
