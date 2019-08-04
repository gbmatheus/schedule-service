const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario');
const authMiddleware = require('../middlewares/auth');

router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);
router.get('/:id', authMiddleware, usuarioController.user);

// router.get('/user/:id', authMiddleware, usuarioController); //perfil do usuário

// router.post('/', usuarioController); //registrar usuário 

// router.get('/login', usuarioController.getLogin);

// HTTP POST /users — Register users.
// HTTP POST /users/login — Allow users to login.
// HTTP GET / users/me — Get user profile.
// HTTP POST /users/logout —Logout the user
// HTTP post /users/logoutall — Logout from all devices.

module.exports = router;
