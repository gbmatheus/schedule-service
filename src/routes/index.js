const express = require("express");

const router = express.Router();

router.use("/user", require("./usuarios"));
router.use("/pacientes", require("./pacientes"));
router.use("/medicos", require("./medicos"));
router.use('/atendimentos', require('./atendimentos'));
router.use('/admin', require('./admin'));

//Pagina inicial
router.get("/", (req, res) =>{
  res.render("index", { message: null })
}
);

//Cadastro Paciente
router.get("/registerPatient", (req, res) =>
  res.render("paciente", { message: null })
);

//Cadastro Medico
router.get("/registerMedical", (req, res) =>
  res.render("medico", { message: null })
);

//Login
router.get("/login", (req, res) =>
  res.render("login", { message: null })
);

router.get("/admin", (req, res) =>
  res.render("admin/adm", { page: 'nome' })
);

//Teste para agendar consulta
router.get('/agendar', (req, res) => { //agendar consulta
  // console.log('- rota de cadastro de consulta - ', req.params.id);
  // console.log(req.session);
  res.render('forms/cadastro-consulta', {message : null});//template de agendamento
});

//Página do usuario
// router.get("/user", (req, res) =>
//   res.render("usuario", { message: null, page: 'Inicio' })
// );

module.exports = router;
