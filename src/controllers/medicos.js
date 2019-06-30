const medico = require("../models/medicos.js");

exports.show = (req, res) => {
  medico.show(req, res).then(
    result => {//success
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
    res.status(200).send({ message: 'get medico' }, result);
  }, function(err){ //fail
    res.status(400).send(err);
  });
};

exports.create = (req, res) => {
  medico.create(req, res).then(
    result => {
      res.status(200).send(result);
    },
    function(err) {
      res.status(400).send(err);
    }
  );
};

exports.update = (req, res) => {
  medico.update(req, res).then(
    result => {
      //success
      res.status(200).send(result);
    },
    function(err) {
      //fail
      res.status(400).send(err);
    }
  );
};

exports.remove = (req, res) => {
  medico.remove(req, res).then(
    result => {
      res.status(200).send(result);
    },
    function(err) {
      res.status(400).send(err);
    }
  );
};
