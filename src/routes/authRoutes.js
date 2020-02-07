const router = require('express').Router();
const authController = require('../controllers/autenticacao');
const UsuarioValidator = require('../validators/usuario');

router.post('/registrar', UsuarioValidator.validacoes(), authController.registra);
router.post('/autenticar', authController.autentica);

module.exports = router;