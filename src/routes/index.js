const express = require("express");

const router = express.Router();

router.use("/usuarios", require("./usuarios"));
router.use("/pacientes", require("./pacientes"));
router.use("/medicos", require("./medicos"));
router.use('/atendimentos', require('./atendimentos'));

//Pagina inicial
router.get("/", (req, res) =>
  res.render("index", { message: null })
);

//Cadastro geral
router.get("/register", (req, res) =>
  res.render("paciente", { message: null })
);

//Cadastro geral
router.get("/registerM", (req, res) =>
  res.render("medico", { message: null })
);

//Login
router.get("/login", (req, res) =>
  res.render("loginBoot", { message: null })
);

//Teste para agendar consulta
router.get('/agendar', (req, res) => { //agendar consulta
  // console.log('- rota de cadastro de consulta - ', req.params.id);
  res.render('consulta', {message : null});//template de agendamento
});

//Página do usuario
router.get("/user", (req, res) =>
  res.render("usuario", { message: null, page: 'Inicio' })
);

module.exports = router;
