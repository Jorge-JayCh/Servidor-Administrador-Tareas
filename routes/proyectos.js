const { Router } = require('express');

const {
    validarJWT
} = require('../middlewares/validar-jwt');

const { 
    proyectosPost
} = require('../controllers/proyectos');
const { check } = require('express-validator');

const router = Router();

// Crear proyecto
// /api/proyectos
router.post('/',
 validarJWT,[
    check('nombre', 'El nombre del proyecto es obligatorio.').not().isEmpty()
 ],
 proyectosPost );




module.exports = router;