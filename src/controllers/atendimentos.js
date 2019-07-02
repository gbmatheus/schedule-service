const atendimentos = require('../models/atendimentos.js');

exports.show = (req, res) => {
  console.log('Visulizar todos atendimentos');
  atendimentos.show(req, res)
  .then(result => { //success
    // res.render('admin/admin-atendimentos', { table: 'Lista de Consultas' , data: result});
    res.json(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.showUsuario = (req, res) => {
  console.log('Visulizar atendimentos de pacientes');
  atendimentos.showUsuario(req, res)
  .then(result => { //success
    if(req.path == '/'+req.params.type+'/'+req.params.id){
      res.status(200).send(result);
    }
    else{
      res.render('admin/admin-atendimentos', { table: 'Lista de Consultas' , data: result});
      // res.status(200).send(result);
    }
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

// exports.get = (req, res) => {
//   console.log('Visulizar um/vários atendimentos');
//   atendimentos.get(req, res)
//   .then(result => { //success
//     console.log(result);
//     res.status(200).send(result);
//   }, function(err){ //fail
//     res.status(400).send(err);
//   });
// };

exports.create = (req, res) => {
  console.log('Criar consulta \nParam - ', req.params.id);
  console.log('Corpo - ', req.body);
  atendimentos.create(req, res)
  .then(result => {
    res.status(200).send('Atentimentos agendado');
  }, function(err){
    res.status(400).send(err);
  });
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
    console(result);
    res.status(200).send(result);    
  }, function(err){
    res.status(400).send(err);
  });
};
