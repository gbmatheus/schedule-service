const { Router } = require('express');
const DoctorController = require('../controllers/DoctorController');

const routeDoctor = Router();

routeDoctor.get('/', DoctorController.index);
routeDoctor.post('/', DoctorController.store);

module.exports = routeDoctor;