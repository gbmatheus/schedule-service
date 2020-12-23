const { Router } = require('express');
const UserContreller = require('../controllers/User/UserController');

const routeUser = Router();

// Apagar rota get
routeUser.get('/users', UserContreller.index);
routeUser.post('/users', UserContreller.store);

module.exports = routeUser;
