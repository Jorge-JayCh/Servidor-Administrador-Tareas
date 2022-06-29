const {request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');


const login = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe ( email )
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg : 'Email / Password no son correctos - email'
            });
        }
        // Verificar el password
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            });
        }
        // Generar JWT
        const token = await generarJWT( usuario.id );

        // Mensaje de confirmacion
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Accesos bloqueado hable con el administrador. '
        });
    }
}

module.exports = {
    login
}