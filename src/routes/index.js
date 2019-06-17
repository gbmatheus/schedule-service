const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.json({ message: "Funcionando!"}));

router.use('/api/usuario', require('./usuario'));
router.use('/api/pacientes', require('./paciente'));
router.use('/api/medicos', require('./medicos'));
// router.use('/api/consultas', require('./consultas'));

module.exports = router;