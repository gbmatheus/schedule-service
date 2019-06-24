const atedimentos = require('../models/atendimentos.js');

exports.get = (req, res) => {
    atedimentos.get(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.create = (req, res) => {
    atedimentos.create(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.update = (req, res) => {
    atedimentos.update(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  
  exports.remove = (req, res) => {
    atedimentos.remove(req, res, function(error, results) {
      if (error) res.json(error);
      else res.json(results);
    });
  };
  