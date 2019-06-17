const medicos = require('../models/medicos.js');

exports.get = (req, res) => {
    medicos.get(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.create = (req, res) => {
    medicos.create(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.update = (req, res) => {
    medicos.update(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.remove = (req, res) => {
    medicos.remove(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  