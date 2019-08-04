const express = require('express');
const router = express.Router();

const medicosController = require('../controllers/medicos.js');
const authMiddleware = require('../middlewares/auth');
const permissionMiddleware = require('../middlewares/permission');

router.post('', medicosController.create);
router.post('/search', medicosController.search);

router.get('', authMiddleware, permissionMiddleware.A, medicosController.show);
router.get('/:id', authMiddleware, permissionMiddleware.A, medicosController.get);


// router.patch('/edit/:id', medicosController.update);
// router.delete('/del/:id', medicosController.remove);

// router.get('/edit/:id', medicosController.get);
// router.post('/edit/:id', medicosController.update);
// router.post('/del/:id', medicosController.remove);

// router.get('/:id/agenda',medicosController.get);//teste de visualizar consulta

module.exports = router;