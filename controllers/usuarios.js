const {request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');


const usuariosGet = ( req, res = response ) => {
    res.json({
        msg: 'desde - GET - MERN Tasks'
    });
}

const usuariosPost = async ( req, res = response ) => {
    
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
        
        // Generar JWT
        const token = await generarJWT( usuario.id );

        // Mensaje de confirmación
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al crear usuario =( .')
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