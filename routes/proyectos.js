const { Router } = require('express');

const { 
    proyectosPost
} = require('../controllers/proyectos');

const router = Router();

// Crear proyecto
// /api/proyectos
router.post('/', proyectosPost );




module.exports = router;