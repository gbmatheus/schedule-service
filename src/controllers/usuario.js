const helpers = require("../helpers/helpers");

const usuario = require("../models/usuario");
const paciente = require("../models/pacientes");
const medico = require("../models/medicos");

exports.show = (req, res) => {
  console.log("admin - ver todos");
  usuario.show(req, res).then(
    result => {
      res.render("dashboardAdmin", { title: "Lista de usuários", data: result });
      console.log(result);
    },
    function(err) {
      res.status(400).send(err); // fail
    }
  );
};

exports.get = (req, res) => {
  console.log("ver usuario = especifico com suas informações");
  usuario.get(req, res).then(
    result => {
      //sucess
      console.log(result);
    },
    function(err) {
      res.status(400).send(err); // fail
    }
  );
};

exports.create = (req, res) => {
  console.log("create usuario\n", req.body);

  usuario.create(req, res).then(
    resultUsuario => {
      if (req.body.typeUser == "m") {
        medico.create(req, res).then(resultMedico => {
          // res.json(resultMedico);
          console.log("Médico adicionado");
        });
      } else {
        //if(req.body.typeUser == 'p') 

        paciente.create(req, res).then(resultPaciente => {
          console.log("Paciente adicionado");
          // res.json(resultPaciente);
        });
      }
      res.redirect("/login");
    },
    function(err) {
      res.status(400).send('"falhou usuario"');
      console.log(res.json(err));
    }
  );
};

exports.login = (req, res, next) => {
  console.log("login usuario\n", req.body);
  
  usuario.login(req, res).then(
    result => {
      //sucess
      if (result.length <= 0) {
        // res.redirect();
        res.status(400).send("Usuário ou senha incorretos");
      
      } else {
        const id = result[0].id;
        const permissao = result[0].permissao;
        var token = helpers.generateToken(id, permissao);

        if (permissao.toString() == "A") {
          // res.status(200).render("admin.ejs", { message: null, page: 'Aréa do Administrador' });
          res.status(200).send({ auth: true, token: token });
        } else if (permissao.toString() == "M") {
          // res.redirect();//aréa do médico
          res.status(200).send({ auth: true, token: token });
        } else if (permissao == "P") {
          res.redirect();//aréa do paciente
          res.status(200).send({ auth: true, token: token });
          // res.redirect();
        } else {
          res.status(200).send({ auth: true, token: token });
        }
      }
    },
    function(err) {
      res
        .status(500)
        .send('"falhou - usuario ou senha incorretos"')
        .json(err);
    }
  );
};

exports.logout = (req, res) => {
  console.log("logout usuario\n");
  res.status(200).send({ auth: false, token: null });
};
