const { Router } = require('express');

const AuthController = require('../controllers/User/AuthController');

const sessionRoutes = Router();

sessionRoutes.post('/sign', AuthController.signIn);

module.exports = sessionRoutes;