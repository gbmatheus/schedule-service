const { Router } =  require('express');
const verifyUser = require('../middlewares/verifyAuth');

const PatientController = require('../controllers/PatientController');

const routePatient = Router();

routePatient.get('/patients', verifyUser,PatientController.index);
routePatient.post('/patients', verifyUser, PatientController.store);

module.exports = routePatient;