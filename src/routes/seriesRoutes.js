const router = require('express').Router();
const serieController = require('../controllers/series');

router.get('/', serieController.listar);
router.post('/', serieController.insere);
router.get('/:id', serieController.buscarPorId);
router.put('/:id', serieController.atualiza);
router.delete('/:id', serieController.delete);

module.exports = router;