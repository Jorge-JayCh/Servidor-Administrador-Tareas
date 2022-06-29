const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    login,
} = require('../controllers/auth');


const router = Router();

// Autenticar usuario
// /api/auth
router.post( '/login',[
    check( 'email', 'Agrega un email válido' ).isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    check( 'password', 'El password debe ser minimo de 6 caracteres.').isLength({ min: 6 }),
    validarCampos
], login );


module.exports = router;