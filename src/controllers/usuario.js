const usuario = require("../models/usuario");
const paciente = require("../models/pacientes");
const medico = require("../models/medicos");

//Realiza o login
exports.login = (req, res) => {
  let user = {
    login: req.body.login,
    password: req.body.password
  };

  //Logar
  usuario.login(user, res).then(
    resultUser => {
      if (resultUser.length == 0)
        //Existencia de usuario
        // return res.status(400).send({ error: 'Usuário não existe ' });
        return res
          .status(400)
          .render("login", { message: "Usuário não existe " });

      if (!user.password || !(resultUser[0].password === user.password))
        //verifica a senha
        // return res.status(400).send({ message: 'Senha inválida ' }).redirect('/login');
        return res.status(400).render("login", { message: "Senha inválida " });

      user = resultUser[0];
      user.password = undefined;

      token = helpers.generateToken({
        id: user.idUsuario,
        typeUser: user.typeUser
      });

      req.session.authorization = `Bearer ${token}`; //gambiarra, salvando o token na session para depois recupera=lo
      // res.set({'authorization': `Bearer ${token}`});//tentativa de salvar no headers
      // res.setHeader('authorization', `Bearer ${token}`);

      console.log("\nLogin \n", req.session);
      usuarioPage(user, res); //vê o usuario e o redireciona

      // res.status(200).set({'authorization': `Bearer ${token}`}).send({
      //   user ,
      //   token: token,
      //  });
      //  console.log(res.headersSent);
    },
    err => {
      res.status(500).send({ error: "Falha interna ", err: err });
    }
  );
};

//Logout
exports.logout = (req, res) => {
  console.log('Antes do logout ',req.session);
  req.session.authorization = null;
  req.session.destroy(function(err) {
    if(err)
      return res.status(500).send(err);
    return res.status(200).redirect("/login");
  });
  req.session = null;
  console.log('Depois do logout ',req.session);
  
  // res.status(200).send({ auth: false, token: null });
};

//Usuario
exports.user = (req, res) => {
  let user = {
    idUser: parseInt(req.userId),
    typeUser: req.userType
  };
  console.log("usuario ", req.params);

  if (user.typeUser === "A")
    return res
      .status(200)
      .send({ message: "Admin, redirecionar para dashboard" });
  else if (user.typeUser === "P")
    paciente.getUserId(user, res).then(
      resultUser => {
        if (user.idUser !== parseInt(req.params.id))
          return res.status(400).send({ error: "Id do usuario é diferente " });

        return res.status(200).send(resultUser);
      },
      err => {
        return res.status(400).send({ err });
      }
    );
  else if (user.typeUser === "M")
    medico.getUserId(user, res).then(
      resultUser => {
        if (user.idUser !== parseInt(req.params.id))
          return res.status(400).send({ error: "Id do usuario é diferente " });

        return res.status(200).send(resultUser);
      },
      err => {
        return res.status(400).send({ err });
      }
    );
  else return res.status(400).send({ error: "Usuário não identificado" });
};

//Usuario
usuarioPage = (req, res) => {
  let user = {
    idUser: parseInt(req.idUsuario),
    typeUser: req.typeUser
  };
  console.log("\nPágina do usuario \n", req.session);

  if (user.typeUser === "A")
    // return res.status(200).send({ message: 'Admin. Seja bem vindo!'});
    return res.status(200).render("admin/inicio");
  else if (user.typeUser === "P")
    paciente.getUserId(user, res).then(
      resultUser => {
        if (req.params && user.idUser !== parseInt(req.params.id))
          return res.status(400).send({ error: "Id do usuario é diferente " });

        // return res.status(200).send({ message: `${resultUser[0].nome}. Seja bem vindo! `, resultUser });
        return res
          .status(200)
          .render("usuario/usuario-paciente", { data: resultUser[0] });
      },
      err => {
        return res.status(400).send({ err });
      }
    );
  else if (user.typeUser === "M")
    medico.getUserId(user, res).then(
      resultUser => {
        if (req.params && user.idUser !== parseInt(req.params.id))
          return res.status(400).send({ error: "Id do usuario é diferente " });

        // return res.status(200).send({ message: `${resultUser[0].nome}. Seja bem vindo! `, resultUser });
        return res
          .status(200)
          .render("usuario/usuario-medico", { data: resultUser[0] });
      },
      err => {
        return res.status(400).send({ err });
      }
    );
  else return res.status(400).send({ error: "Usuário não identificado" });
};
