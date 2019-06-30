const express = require('express');
const router = express.Router();

const pacientesController = require('../controllers/pacientes.js');

router.get('', pacientesController.show);
router.get('/:id', pacientesController.get);
router.post('', pacientesController.create);
// router.patch('/:id', pacientesController.update);
// router.delete('/d:id', pacientesController.remove);

router.get('/edit/:id', pacientesController.get);
router.post('/edit/:id', pacientesController.update);

router.post('/del/:id', pacientesController.remove);

module.exports = router;