const pacientes = require("../models/pacientes.js");

exports.get = (req, res) => {
  pacientes.get(req, res, function(error, results) {
    if (error) res.json(error);
    else res.json(results);
  });
};

exports.create = (req, res) => {
  pacientes.create(req, res, function(error, results) {
    if (error) res.json(error);
    else res.json(results);
  });
};

exports.update = (req, res) => {
  pacientes.update(req, res, function(error, results) {
    if (error) res.json(error);
    else res.json(results);
  });
};

exports.remove = (req, res) => {
  pacientes.remove(req, res, function(error, results) {
    if (error) res.json(error);
    else res.json(results);
  });
};

// module.exports = {

//     async get(req, res){
//         pacientes.get(req, res, function (error, results) {
//             // if(error) return console.log(error);
//             // console.log('Listou pacientes');
//             if(error) res.json(error);
//             else res.json(results);
//         });
//     },

//     async post(req, res){
//         pacientes.create(req, res, function (error, results) {
//             // if(error) return console.log(error);
//             // console.log('Listou pacientes');
//             if(error) res.json(error);
//             else res.json(results);
//         });
//     },

//     async patch(req, res){
//         pacientes.update(req, res, function (error, results) {
//             // if(error) return console.log(error);
//             // console.log('Listou pacientes');
//             if(error) res.json(error);
//             else res.json(results);
//         });
//     },

//     async delete(req, res){
//         pacientes.remove(req, res, function (error, results) {
//             // if(error) return console.log(error);
//             // console.log('Listou pacientes');
//             if(error) res.json(error);
//             else res.json(results);
//         });

//     }

// }
