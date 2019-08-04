const helpers = require('../helpers/helpers.js');

let pacientes = function() {};

//Retorna todos os pacientes
pacientes.prototype.show = function(req, res) {
  let sql = `SELECT p.*, u.* FROM pacientes p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE u.typeUser != 'A' ORDER BY p.nome;`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Retorna um paciente pelo id
pacientes.prototype.get = function(req, res) {
  let sql = `SELECT p.*, u.* FROM pacientes p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE p.idPaciente = '${req.params.id}' AND u.typeUser != 'A';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Criar paciente
pacientes.prototype.create = function(req, res) {
  //req.cpf.replace(/[^\d]+/g,'')
  // let telefone = req.telefone;   let celular = req.celular;   let email = req.email.toLowerCase();   let endereco = req.endereco.toLowerCase();   let numero = parseInt(req.numero);   let bairro = req.bairro.toLowerCase();   let cep = req.cep.replace(/[^\d]+/g,'');   let cidade = req.cidade.toLowerCase();   let uf = req.uf;
  let sql = `INSERT INTO pacientes (nome, cpf, sexo, nascimento, idUsuario) VALUES ('${req.nome}','${req.cpf}','${req.sexo}','${req.nascimento}', '${req.idUser}');`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Atualiza paciente
pacientes.prototype.update = function(req, res) {
  const id = parseInt(req.params.id);
  let nome = req.nome.toLowerCase();
  let cpf = req.cpf;
  let sexo = req.sexo.toUpperCase();
  let nascimento = req.nascimento;
  // let telefone = req.telefone;
  // let celular = req.celular;
  // let email = req.email.toLowerCase();
  // let endereco = req.endereco.toLowerCase();
  // let numero = parseInt(req.numero);
  // let bairro = req.bairro.toLowerCase();
  // let cep = req.cep.replace(/[^\d]+/g, '');
  // let cidade = req.cidade.toLowerCase();
  // let uf = req.uf;

  let sql = `UPDATE pacientes SET nome='${nome}', cpf='${cpf}', sexo='${sexo}', nascimento='${nascimento}', conTelefone='${telefone}', conCelular='${celular}', conEmail='${email}', endLogradouro='${endereco}', endNumero='${numero}', endBairro='${bairro}', endCep='${cep}', endCidade='${cidade}', idUF='${uf}' WHERE id='${id}';`; //and cpf = ${cpf};

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Remover paciente
pacientes.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(
      `DELETE FROM pacientes WHERE id=` + parseInt(req.params.id),
      (error, results) => {
        if (error) return reject(error);
        else resolve(results);
      }
    );
  });
};

//Ativar/inativar paciente
pacientes.prototype.activate = function(req, res) {};

//Retorna um paciente para verificação 
pacientes.prototype.getUser = function(req, res) {
  let sql = `SELECT p.*, u.* FROM pacientes p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE p.cpf = '${req.cpf}' or u.login = '${req.login}' or u.email = '${req.email}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

pacientes.prototype.getUserId = function(req, res) {
  let sql = `SELECT p.*, u.* FROM pacientes p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE u.idUsuario = '${req.idUser}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};


module.exports = new pacientes();
