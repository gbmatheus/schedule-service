const { Router } =  require('express');

const PatientController = require('../controllers/PatientController');

const routePatient = Router();

routePatient.get('/patients', PatientController.index);
routePatient.post('/patients', PatientController.store);

module.exports = routePatient;