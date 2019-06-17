const usuario = require("../models/usuario");
// const helpers = require("../helpers/helpers");

exports.register = (req, res) =>{ 
  // let hashPassaword = helpers.generateHash(req.body.password);
  // var user = {login: req.body.login, password: hashPassaword}
  // var user = { login: req.body.login, password: req.body.password };
  usuario.create(req, res, function (error, results) {
    if(error) res.json(error);
    else res.json(results);    
  });
};

exports.login = (req, res) => {
  // var user = { login: req.body.login, password: req.body.password };
  usuario.get(req, res, function (error, results) {
    if(error) res.json(error);
    else res.json(results);    
  });
};

exports.show = (req, res) => {
  usuario.show(req, res, function (error, results) {
    if(error) res.json(error);
    else res.json(results);    
  });
};