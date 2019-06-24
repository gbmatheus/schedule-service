const express = require("express");

const router = express.Router();

router.get("/", (req, res) =>
  // res.json({ message: "Funcionando!"})
  // res.render("login", { message: null })
  res.render("index", { message: null })
  // res.render("loginBoot", { message: null })
  // res.render("cadastro-medico", { message: null })
  // res.render("dashboardAdmin", { message: null })
);

router.get("/register", (req, res) =>
  // res.json({ message: "Funcionando!"})
  // res.render("register", { message: null })
  res.render("cadastroBoot", { message: null })
);

router.get("/login", (req, res) =>
  // res.json({ message: "Funcionando!"})
  res.render("loginBoot", { message: null })
);

router.use("/user", require("./usuario"));
router.use("/api/pacientes", require("./paciente"));
router.use("/api/medicos", require("./medicos"));
router.use('/con', require('./atendimentos'));

module.exports = router;
