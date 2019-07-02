const express = require('express');
const router = express.Router();

const atendimentoController = require('../controllers/atendimentos');

// router.get('', atendimentoController.show); //mostra todas as consultas
router.get('', atendimentoController.showUsuario); //mostra todas as consultas
// router.get('/:id?', atendimentoController.get);
router.post('', atendimentoController.create); //agendar consulta
// router.patch('/edit/:id', atendimentoController.update);
// router.delete('/del/:id', atendimentoController.remove);

router.get('/:type?/:id?', atendimentoController.showUsuario);//tipo de usuario/id do usuario

// router.get('/edit/:id', atendimentoController.get);
// router.post('/edit/:id', atendimentoController.update);
// router.delete('/del/:id', atendimentoController.remove);

module.exports = router;