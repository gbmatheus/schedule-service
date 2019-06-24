// const helpers = require("../helpers/helpers");

const medico = require('../models/medicos.js');

exports.show = (req, res) => {
  console.log('Visulizar todos medicos');
  medico.show(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.get = (req, res) => {
  console.log('Visulizar um/vários medico');
  medico.get(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.create = (req, res) => {
  console.log('criar medico\n', req.body);
  medico.create(req, res)
  .then(result => {
    console(result);
    res.status(200).send(result);    
  }, function(err){
    res.status(400).send(err);
  });
};

exports.update = (req, res) => {
  console.log('Atualizar medico');
  medico.update(req, res)
  .then(result => { //success
    console.log(result);
    res.status(200).send(result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.remove = (req, res) => {
  console.log('Remover medico');
  medico.remove(req, res)
  .then(result => {
    console(result);
    res.status(200).send(result);    
  }, function(err){
    res.status(400).send(err);
  });
};
