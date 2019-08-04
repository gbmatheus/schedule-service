const helpers = require("../helpers/helpers.js");

let medicos = function() {};

//Retorna todos os medicos
medicos.prototype.show = function(req, res) {
  let sql = `SELECT m.*, uf.*, e.*, u.*, u.idUsuario FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf= uf.idUf JOIN usuarios u ON u.idUsuario = m.idUsuario`;
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Retorna medico pelo id
medicos.prototype.get = function(req, res) {
  let sql = `SELECT m.*, uf.*, e.*, u.*, u.idUsuario FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf= uf.idUf JOIN usuarios u ON u.idUsuario = m.idUsuario WHERE m.idMedico= '${parseInt(req.params.id)}'`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Criar medico
medicos.prototype.create = function(req, res) {
  // let nome = req.body.nome.toLowerCase();   let crm = req.body.crm.replace(/[^\d]+/g,'');   let emissor = parseInt(req.body.emissor);   let nascimento = req.body.nascimento;   let especialidade = parseInt(req.body.especialidade);   
  // let telefone = req.body.telefone;   let celular = req.body.celular;

  let sql = `INSERT INTO medicos (nome, nascimento, crm, idUf, idEspecialidade, idUsuario) VALUES ('${req.nome}','${req.nascimento}','${req.crm}','${req.uf}','${req.especialidade}', '${req.idUser}');`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Atualizar medico
medicos.prototype.update = function(req, res) {
  const id = parseInt(req.params.id);
  let nome = req.body.nome.toLowerCase();   let crm = req.body.crm.replace(/[^\d]+/g,'');   let emissor = parseInt(req.body.emissor);   let nascimento = req.body.nascimento;   let especialidade = parseInt(req.body.especialidade);   let telefone = req.body.telefone;   let celular = req.body.celular;   let email = req.body.email.toLowerCase();

  let sql = `UPDATE medicos SET nome='${nome}', crm='${crm}', emissor='${emissor}', nascimento='${nascimento}', idEspecialidade='${especialidade}', conTelefone='${telefone}', conCelular='${celular}', conEmail='${email}' WHERE idMedico='${id}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
        if (error) return reject(error);
        else resolve(results);
    });
  });
};

//Remover medico
medicos.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM medicos WHERE id=` + parseInt(req.params.id), (error, results) => {
        if (error) return reject(error);
        else resolve(results);
    });
  });
};

//Ativar/Inativar medico
medicos.prototype.activate = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(`DELETE FROM medicos WHERE id=` + parseInt(req.params.id), (error, results) => {
        if (error) return reject(error);
        else resolve(results);
    });
  });
};

//Retorna um medico para verificação
medicos.prototype.getUser = function(req, res) {
  let sql = `SELECT m.*, uf.*, e.*, u.* FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf= uf.idUf JOIN usuarios u ON u.idUsuario = m.idUsuario WHERE u.login = '${req.login}' or u.email = '${req.email}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Retornar o médico pelo id do Usuario
medicos.prototype.getUserId = function(req, res) {
  let sql = `SELECT m.*, uf.*, e.*, u.* FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf= uf.idUf JOIN usuarios u ON u.idUsuario = m.idUsuario WHERE u.idUsuario = '${req.idUser}';`;

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Buscar médico
medicos.prototype.search = function(req, res) {
  let filterNome = `'%%'`;   
  let filterCrm = `'%%'`;   
  let filterUf = `'%%'`;   
  let filterEspecialidade = `'%%'`;
  
  if(req.nome)
    filterNome = `'%${req.nome}%'`;
  if(req.crm)
    filterCrm = `'%${req.crm}%'`;
  if(req.uf)
    filterUf = `'%${req.uf}%'`;
  if(req.especialidade)
    filterEspecialidade = `'%${req.especialidade}%'`;
  
  let sql = `SELECT m.*, uf.*, e.*, u.* FROM medicos m JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf= uf.idUf JOIN usuarios u ON u.idUsuario = m.idUsuario WHERE m.nome LIKE ${filterNome} AND m.crm LIKE ${filterCrm} AND m.idUf LIKE ${filterUf} AND m.idEspecialidade LIKE ${filterEspecialidade};`;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

module.exports = new medicos();