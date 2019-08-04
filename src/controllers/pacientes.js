const paciente = require("../models/pacientes.js");
const usuario = require("../models/usuario.js");

//Mostrar todos pacientes
exports.show = (req, res) => {
  paciente.show(req, res).then(
    resultShow => {
      let pacientes = [];

      resultShow.forEach(element => {
        let user = {
          idPaciente: element.idPaciente,
          nome: element.nome,
          cpf: element.cpf,
          sexo: element.sexo,
          nascimento: {
            dia: element.nascimento.getDate(),
            mes: 1 + element.nascimento.getMonth(),
            ano: element.nascimento.getFullYear()
          },
          idUsuario: element.idUsuario,
          login: element.login,
          email: element.email,
          password: element.password,
          typeUser: element.typeUser,
          active: element.active
        };
        
        user.sexo =
          element.sexo === "M"
            ? "Masculino"
            : element.sexo === "F"
            ? "Feminino"
            : "Outros";

        user.active = (user.active === 1 ? 'Sim ' : 'Não ');
        
        pacientes.push(user);
      });
      // res.status(200).send(resultShow);
      res.status(200).render("admin/listagem-pacientes", { data: pacientes });
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Mostrar um paciente
exports.get = (req, res) => {
  paciente.get(req, res).then(
    result => {
      res.status(200).send(result);
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Criar um paciente
exports.create = (req, res) => {
  let user = {
    nome: req.body.nome.toLowerCase(),
    cpf: req.body.cpf,
    sexo: req.body.sexo,
    nascimento: req.body.nascimento,
    email: req.body.email.toLowerCase(),
    login: req.body.login.toLowerCase(),
    password: req.body.password.toLowerCase(),
    typeUser: "P",
    idUser: undefined
  };

  //Verifica se o paciente já existe
  paciente.getUser(user, res).then(resultaGet => {
    if (resultaGet.length > 0) {
      if (resultaGet[0].cpf === user.cpf)
        //verificação do cpf
        return res.status(400).send({ error: "Paciente com cpf já existe " });
      // return res.status(400).render('paciente', { message: 'CPF já em uso ', data: user });

      if (resultaGet[0].login === user.login)
        //verificação do login
        return res.status(400).send({ error: "Nome do usuário já existe " });
      // return res.status(400).render('paciente', { message: 'Usuário já em uso ', data: user });

      if (resultaGet[0].email === user.email)
        //verificação do email
        return res.status(400).send({ error: "Email já está em uso " });
      // return res.status(400).render('paciente', { message: 'Email já em uso ', data: user });
    }
    //cria usuario
    usuario.create(user, res).then(
      resultUsuario => {
        user.idUser = resultUsuario.insertId;

        //cria paciente
        paciente.create(user, resultUsuario).then(resultPaciente => {
          // res.status(200).send(resultPaciente);
          res.status(200).redirect("/login");
        });
      },
      err => {
        res.status(400).send({ error: "Falha no cadastro ", err: err });
      }
    );
  });
};

//Atualizar paciente
exports.update = (req, res) => {
  paciente.update(req, res).then(
    result => {
      res.status(200).send(result);
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Remover paciente
exports.remove = (req, res) => {
  paciente.remove(req, res).then(
    result => {
      res.status(200).send(result);
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Inativar paciente
exports.activate = (req, res) => {};
