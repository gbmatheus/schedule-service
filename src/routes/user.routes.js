const { Router } = require('express');
const UserContreller = require('../controllers/UserController')

const routeUser = Router();

routeUser.get('/users', UserContreller.index);
routeUser.post('/users', UserContreller.store);

module.exports = routeUser;
