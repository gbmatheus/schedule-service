const helpers = require('../helpers/helpers');

let atendimentos = function() {};

atendimentos.prototype.show = function(req, res) {
  sql = `SELECT p.nome as paciente, p.cpf, m.nome as medico, m.crm, m.emissor, c.dia, c.hora FROM medicos m JOIN consultas c ON m.idUsuario = c.idMedico JOIN pacientes p ON p.idPaciente = c.idPaciente ORDER BY medico, paciente, c.dia, c.hora;`;
    
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

atendimentos.prototype.showUsuario = function(req, res) {
  console.log('ver atendimentos \n tipo', req.params.typeUser,' \n id - ', req.params.id);//incluir condição para permissão
  let filter = '';
  let column = '';
  
  if(req.params.typeUser === 'm'){
    column ='p.*, p.nome as paciente, p.idUsuario as idUsuarioPaciente, ';//, p.nascimento,';
    if(req.params.id)
    filter = 'WHERE m.idMedico = '+parseInt(req.params.id); 
  
  }else if(req.params.typeUser === 'p') {
    column = 'm.*, m.nome as medico, m.idUsuario as idUsuarioMedico, e.*, uf.*, ';
    if(req.params.id)
      filter = 'WHERE p.id ='+parseInt(req.params.id); 
  
  }else column = 'p.*, p.nome as paciente, p.idUsuario as idUsuarioPaciente, m.*, m.nome as medico, m.idUsuario as idUsuarioMedico, e.*, uf.*, ';

  sqlShowPac = `SELECT ${column} c.* FROM consultas c JOIN medicos m ON m.idMedico = c.idMedico JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf = uf.idUf JOIN pacientes p ON p.idPaciente = c.idPaciente ${filter} ORDER BY c.dia, c.hora;`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sqlShowPac, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

atendimentos.prototype.get = function(req, res) {
  const id = parseInt(req.params.id);
  
  // let sql = `SELECT * FROM consultas WHERE idConsulta=${id}`;
  let sql = `SELECT p.*, p.nome as paciente, p.idUsuario as idUsuarioPaciente, m.*, m.nome as medico, m.idUsuario as idUsuarioMedico, e.*, uf.*, c.* FROM consultas c JOIN medicos m ON m.idMedico = c.idMedico JOIN especialidades e ON m.idEspecialidade = e.idEspecialidade JOIN uf ON m.idUf = uf.idUf JOIN pacientes p ON p.idPaciente = c.idPaciente WHERE idConsulta=${id} ORDER BY c.dia, c.hora;`
    
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

atendimentos.prototype.create = function(req, res) {
  console.log('criando atendimentos pacientes');
  // let dia = req.dia;   let hora = req.hora;   let idMedico = parseInt(req.idMedico);   let idPaciente = parseInt(req.idPaciente);//pegar pelo parametros
  
  let sql = `INSERT INTO consultas (dia, hora, idMedico, idPaciente) VALUES ('${req.dia}', '${req.hora}', ${req.idMedico}, ${req.idPaciente});`

  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//?
atendimentos.prototype.update = function(req, res) {
  const id = parseInt(req.params.id);
  let data = req.body.data;
  let hora = req.body.hora;
  let idMedico = parseInt(req.body.idMed);
  let idPaciente = parseInt(req.body.idPac);//pegar pelo parametros
  
  let sql = `UPDATE atendimentos SET dia='${data}', hora='${hora}', idMedico='${idMedico}', idPaciente='${idPaciente}' WHERE id='${id}';`;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  })
};

//?
atendimentos.prototype.remove = function(req, res) {
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(
      `DELETE FROM atendimentos WHERE id=` + parseInt(req.params.id),
      (error, results) => {
        if (error) return reject(error);
        else resolve(results);
      }
    );
  });
};


atendimentos.prototype.cancele = function(req, res) {
  let sql = `UPDATE consultas SET status = 'cancelada' WHERE (idConsulta = ${req.params.id})`;
  
  return new Promise((resolve, reject) => {
    helpers.execNoPromise(sql, (error, results) => {
        if (error) return reject(error);
        else resolve(results);
    });
  });
};

module.exports = new atendimentos();
