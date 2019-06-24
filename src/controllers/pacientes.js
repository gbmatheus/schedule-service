// const helpers = require("../helpers/helpers");

const paciente = require('../models/pacientes.js');
const atendimentos = require('../models/atendimentos.js');

exports.show = (req, res) => {
  console.log('Visulizar todos pacientes');
  paciente.show(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.get = (req, res) => {
  console.log('Visulizar um/vários paciente');
  paciente.get(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.create = (req, res) => {
  console.log('criar paciente\n', req.body);
  paciente.create(req, res)
  .then(result => {
    console(result);
    res.status(200).send(result);    
  }, function(err){
    res.status(400).send(err);
  });
};

exports.update = (req, res) => {
  console.log('Atualizar paciente');
  paciente.update(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.remove = (req, res) => {
  console.log('Remover paciente');
  paciente.remove(req, res)
  .then(result => {
    console(result);
    res.status(200).send(result);    
  }, function(err){
    res.status(400).send(err);
  });
};
