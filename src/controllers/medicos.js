const medico = require("../models/medicos.js");
const usuario = require('../models/usuario.js');

exports.show = (req, res) => {
  medico.show(req, res)
  .then(result => {//success
      // res.status(200).send(result);
      res.render('admin/admin-medicos', { table: 'Lista de Médicos' , data: result});
    },
    function(err) {//fail
      res.status(400).send(err);
    });
};

exports.get = (req, res) => {
  medico.get(req, res)
  .then(result => { //success
    //verifica a rota
    if(req.path == '/edit/'+req.params.id){
      res.status(200).render('forms/medico-editar', {data: result[0]});
    // }else if(req.path = '/edit/:id'){
      // res.render('admin/admin-pacientes', { table: 'Lista de Pacientes' , data: result});
    }else{
    res.status(200).send(result);
    }
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

//Criar paciente, por hora não está sendo utilizado
//A criação fica por conta do usuario
exports.create = (req, res) => {
  medico.create(req, res)
  .then(result => {
      res.status(200).send(result);
  },function(err) {
      res.status(400).send(err);
  });
};

//update pelo medico
exports.update = (req, res) => {
  console.log(req.body);
  //variavel com os atributos de usuario
  let user = { id: req.body.idUsuario, login: req.body.usuario, senha: req.body.senha }
  
  medico.update(req, res)
  .then(result => { //success
    usuario.update(user, result).then(resultUser => {
      res.status(200).send(resultUser);
    })
    // res.status(200).send(result);
  }, (err) => { //fail
    res.status(400).send(err);
  });
};

exports.remove = (req, res) => {
  //gambiarra para excluir usuario pelo medico
  let idUser = 0;
  //método get para pegar o id do usuario
  medico.get(req, res).then(result => {idUser = parseInt(result[0].idUsuario);}, 
    (err) => {res.status(400).send(err);});

  medico.remove(req, res)
  .then(result => {
    usuario.remove(idUser, result).then(resultUser => {
      res.status(200).send(resultUser);
    });
  }, function(err){
    res.status(400).send(err);
  });
};