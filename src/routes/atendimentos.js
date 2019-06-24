const express = require('express');
const router = express.Router();

const atendimentoController = require('../controllers/atendimentos');

router.get('/', atendimentoController.show);

module.exports = router;