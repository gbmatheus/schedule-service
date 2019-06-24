const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.ver);
router.post('/register', usuarioController.criar);
router.post('/login', usuarioController.entrar);

module.exports = router;
