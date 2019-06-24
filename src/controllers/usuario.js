const helpers = require("../helpers/helpers");

const usuario = require("../models/usuario.js");
// const paciente = require('../models/pacientes.js');
// const medico = require('../models/medicos.js');

exports.ver = (req, res) => {
  console.log('admin - ver todos');
  usuario.ver(req, res)
  .then(result => { //sucess
    // res.render('list', { title: "Lista de usuários", data: result});
    res.render("dashboardAdmin", { title: "Lista de usuários", data: result });//teste dashboard listar usuários
    console.log(result);
  }, function(err){
    res.status(400).send(err); // fail
  });
};

exports.get = (req, res) => {
  console.log('ver usuario');
  usuario.get(req, res)
  .then(result => { //sucess
    // res.render('list', { title: req.body.login , data: result});
    console.log(result);
  }, function(err){
    res.status(400).send(err); // fail
  });
};

exports.criar = (req, res) => {
  console.log('criar usuario\n', req.body);
  
  usuario.criar(req, res)
  .then(result => {
    if(req.body.typeUser == 'm')
      console.log('Medico');
    else if(req.body.typeUser == 'p')
      console.log('Paciente');
    else console.log('Erro/Outro tipo usuário');
    // paciente.create(req, res);//cuidado ao criar
    //criacao de um paciente
    // paciente.create(req, res);//cuidado ao criar
    res.status(200).send('"sucesso - criou usuario"');
    // res.redirect("/");
    res.json(result);
    
  }, function(err){
    res.status(400).send('"falhou usuario"');
    console.log(res.json(err));
  });
};

exports.entrar = (req, res) => {
  console.log('login usuario\n', req.body);
  usuario.entrar(req, res)
  .then(result => { //sucess
    if(result.length <= 0){
      // res.redirect();
      res.status(400).send('"falhou - usuario ou senha incorretos"')
    
    }else{
      const id = result[0].id;
      const permissao = result[0].permissao;
      var token = helpers.generateToken(id);

      if(permissao == 'a'){
      // res.redirect();//painel do admin
      console.log('admin')
      res.render("admin.ejs", { message: null })
      // res.status(200).send({auth: true, token: token, message: 'admin'});
      }else if(permissao == 'm')
      // res.redirect();//aréa do médico
      res.status(200).send({auth: true, token: token, message: 'medico'});
      else if(permissao == 'p')
      // res.redirect();//aréa do paciente
      res.status(200).send({auth: true, token: token, message: 'paciente'});
      else
      // res.redirect();
      res.status(200).send({auth: true, token: token, message: 'usuario'});
    } 
  }, function(err){
    res.status(400).send('"falhou - usuario ou senha incorretos"');
    console.log(err);
  });
};

exports.sair = (req, res) => {
  console.log('logout usuario\n');
  res.status(200).send({ auth: false, token: null});
};