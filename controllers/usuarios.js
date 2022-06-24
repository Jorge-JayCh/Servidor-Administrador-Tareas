const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const usuariosGet = ( req, res = response ) => {
    res.json({
        msg: 'desde - GET - MERN Tasks'
    });
}

const usuariosPost = async ( req, res = response ) => {
    
    // Controlar los errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    const {nombre, email, password } = req.body;

    try {
        
        // Controlar que el usuario a registrar sea unico
        let usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({ msg: 'El usuario ya existe ' });
        } 
        // Crear el nuevo usuario
        usuario = new Usuario({ nombre, email, password });

        // encriptar el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash( password, salt );
    
        // Guardar el nuevo usuario
        await usuario.save();
        
        // Crear y firmar el jWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // Firmar el JWT
        jwt.sign( payload, process.env.PRIVATE_KEY, {
            expiresIn: '1h'
        }, ( error, token ) => {
            if ( error ) throw error;
            
            // Mensaje de confirmación
            res.json({
                usuario,
                token
            });
        });


        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error =( .')
    }
}

const usuariosPut = ( req, res = response ) => {
    
}

const usuariosDelete = ( req, res = response ) => {
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
};