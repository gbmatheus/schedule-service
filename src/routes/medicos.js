const express = require('express');
const router = express.Router();

const medicosController = require('../controllers/medicos.js');

router.get('', medicosController.show);
router.get('/:id', medicosController.get);
router.post('', medicosController.create);
// router.patch('/edit/:id', medicosController.update);
// router.delete('/del/:id', medicosController.remove);

router.get('/edit/:id', medicosController.get);
router.post('/edit/:id', medicosController.update);
router.post('/del/:id', medicosController.remove);

module.exports = router;