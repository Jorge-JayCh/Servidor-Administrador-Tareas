const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');


const router = Router();

router.get( '/', usuariosGet );

router.post( '/',[
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'Agrega un email válido' ).isEmail(),
    check( 'password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
], usuariosPost );

router.put( '/',);

router.delete( '/',);

module.exports = router;