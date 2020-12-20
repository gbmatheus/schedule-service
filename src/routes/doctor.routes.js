const { Router } = require('express');
const DoctorController = require('../controllers/DoctorController');

const routeDoctor = Router();

routeDoctor.get('/doctors', DoctorController.index);
routeDoctor.post('/doctors', DoctorController.store);

module.exports = routeDoctor;