const express = require('express');
const router = express.Router();

const helpers = require('../helpers/helpers');
const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.show);
// router.get('/', usuarioController.show);
router.post('/', usuarioController.create);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);



module.exports = router;
