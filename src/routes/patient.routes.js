const { Router } =  require('express');

const PatientController = require('../controllers/PatientController');

const routePatient = Router();

routePatient.get('/', PatientController.index);
routePatient.post('/', PatientController.store);

module.exports = routePatient;