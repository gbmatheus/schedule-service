const atendimentos = require('../models/atendimentos.js');

exports.show = (req, res) => {
  console.log('Visulizar todos atendimentos');
  atendimentos.show(req, res)
  .then(result => { //success
    res.render('admin/admin-atendimentos', { table: 'Lista de Consultas' , data: result});
    // res.status(200).json(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.showUsuario = (req, res) => {
  console.log('Visulizar atendimentos de pacientes');
  atendimentos.showUsuario(req, res)
  .then(result => { //success
    if(req.path == '/'+req.params.typeUser+'/'+req.params.id){
      res.status(200).send(result);
    }
    else{
      // res.render('admin/admin-atendimentos', { table: 'Lista de Consultas' , data: result});
      res.status(200).send(result);
    }
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.get = (req, res) => {
  console.log('Visulizar um/vários atendimentos');
  atendimentos.get(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.create = (req, res) => {
  let consulta = {
    dia: req.body.dia,
    hora: req.body.hora,
    idMedico : parseInt(req.body.idMedico),
    idPaciente : parseInt(req.body.idPaciente)
  }

  if(Date.parse(consulta.dia) < Date.now())
    return res.status(400).send({ error: 'Data informada inválida, anterior à data atual ' });
  
  console.log('Criar consulta \nParam - ', req.params);
  console.log('Corpo - ', req.body);
  
  // consulta.dia = new Date(consulta.dia);
  console.log('Consulta - ', consulta);

  atendimentos.create(consulta, res).then(
    resultConsulta => {
      res.status(200).send({ message: 'Atentimentos agendado ', resultConsulta });
    }, 
    err => {
      res.status(400).send({err});
    }
  );
};

exports.update = (req, res) => {
  console.log('Atualizar atendimentos\n',req);
  atendimentos.update(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.remove = (req, res) => {
  console.log('Remover atendimentos');
  atendimentos.remove(req, res)
  .then(result => {
    console.log(result);
    res.status(200).send(result);    
  }, err => {
    res.status(400).send(err);
  });
};

exports.cancele = (req, res) => {
  console.log('Cancelar atendimentos');
  atendimentos.cancele(req, res)
  .then(result => {
    console.log(result);
    res.status(200).send(result);    
  }, err => {
    res.status(400).send(err);
  });
};

exports.agendar =  (req, res) => { //agendar consulta
  res.render('forms/cadastro-consulta', {message : null});//template de agendamento
}