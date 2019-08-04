const medico = require("../models/medicos.js");
const usuario = require("../models/usuario.js");

//Mostrar todos
exports.show = (req, res) => {
  medico.show(req, res).then(
    resultShow => {
      let medicos = [];

      resultShow.forEach(element => {
        let user = {
          idMedico: element.idMedico,
          nome: element.nome,
          nascimento: {
            dia: element.nascimento.getDate(),
            mes: 1 + element.nascimento.getMonth(),
            ano: element.nascimento.getFullYear()
          },
          crm: element.crm,
          uf: element.uf,
          especialidade: element.especialidade,
          idUsuario: element.idUsuario,
          login: element.login,
          email: element.email,
          password: element.password,
          typeUser: element.typeUser,
          active: parseInt(element.active)
        };
        
        user.active = (user.active === 1 ? 'Sim ' : 'Não ');
        medicos.push(user);
      });

      // res.status(200).send(resultShow);
      res.status(200).render("admin/listagem-medicos", { data: medicos });
      
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Mostrar um medico
exports.get = (req, res) => {
  medico.get(req, res).then(
    result => {
      res.status(200).send(result);
    },
    err => {
      res.status(400).send(err);
    }
  );
};

//Cria medico
exports.create = (req, res) => {
  let user = {
    nome: req.body.nome.toLowerCase(),
    nascimento: req.body.nascimento,
    crm: parseInt(req.body.crm),
    uf: parseInt(req.body.uf),
    especialidade: req.body.especialidade,
    email: req.body.email.toLowerCase(),
    login: req.body.login.toLowerCase(),
    password: req.body.password.toLowerCase(),
    typeUser: "M",
    idUser: undefined
  };
  //Verifica a existencia do medico
  medico.getUser(user, res).then(resultUser => {
    if (resultUser.length > 0) {
      if (
        parseInt(resultUser[0].crm) === user.crm &&
        parseInt(resultUser[0].idUf) === user.uf
      )
        //Verifica crm e uf
        return res.status(400).send({ error: "Médico com crm já cadastrado " });

      if (resultUser[0].login === user.login)
        //Verifica o login
        return res.status(400).send({ error: "Nome do usuário já existe " });

      if (resultUser[0].email === user.email)
        //Verifica o email
        return res.status(400).send({ error: "Email já está em uso " });
    }
  });

  //Cria o usuario
  usuario.create(user, res).then(
    resultUsuario => {
      user.idUser = resultUsuario.insertId;

      //Cria medico
      medico.create(user, resultUsuario).then(resultMedico => {
        res.status(200).send(resultMedico);
      });
    },
    err => {
      return res
        .status(400)
        .send({ message: "Falha no cadastro ", error: err });
    }
  );
};

//atualizar medico
exports.update = (req, res) => {
  console.log(req.body);
  //variavel com os atributos de usuario
  let user = {
    id: req.body.idUsuario,
    login: req.body.usuario,
    senha: req.body.senha
  };

  medico.update(req, res).then(
    result => {
      //success
      usuario.update(user, result).then(resultUser => {
        res.status(200).send(resultUser);
      });
      // res.status(200).send(result);
    },
    err => {
      //fail
      res.status(400).send(err);
    }
  );
};

//remover medico
exports.remove = (req, res) => {
  //gambiarra para excluir usuario pelo medico
  let idUser = 0;
  //método get para pegar o id do usuario
  medico.get(req, res).then(
    result => {
      idUser = parseInt(result[0].idUsuario);
    },
    err => {
      res.status(400).send(err);
    }
  );

  medico.remove(req, res).then(
    result => {
      usuario.remove(idUser, result).then(resultUser => {
        res.status(200).send(resultUser);
      });
    },
    function(err) {
      res.status(400).send(err);
    }
  );
};

//
exports.activate = (req, res) => {};

//buscar medico
exports.search = (req, res) => {
  let user = {
    nome: req.body.nome,
    crm: parseInt(req.body.crm),
    uf: parseInt(req.body.uf),
    especialidade: parseInt(req.body.especialidade)
  };
  console.log(user);

  medico.search(user, res).then(
    resultMedico => {
      if (resultMedico < 1)
        return res.status(400).send({ error: "Nenhum médico encontrado " });

      return res.status(200).send(resultMedico);
    },
    err => {
      return res.status(400).send({ message: "Falha na busca ", error: err });
    }
  );
};
