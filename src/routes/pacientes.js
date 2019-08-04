const express = require('express');
const router = express.Router();

const pacientesController = require('../controllers/pacientes.js');
const authMiddleware = require('../middlewares/auth');
const permissionMiddleware = require('../middlewares/permission');


router.get('', authMiddleware, permissionMiddleware.A, pacientesController.show);
router.get('/:id',authMiddleware, permissionMiddleware.A, pacientesController.get);

router.post('', pacientesController.create);

//precisa de middleware

// router.get('/:id', pacientesController.get);

// router.get('/edit/:id', pacientesController.get);
// router.post('/edit/:id', pacientesController.update);

// router.post('/del/:id', pacientesController.remove);


// router.get('/:id/agendar',pacientesController.get);//teste de agendar

module.exports = router;