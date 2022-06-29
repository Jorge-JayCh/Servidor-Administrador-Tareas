const { validationResult } = require('express-validator');

// Middleware personalizado
const validarCampos = ( req, res, next ) => {

    // Controlar los errores
    const errores = validationResult(req);

    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    next();
}

module.exports = {
    validarCampos
}