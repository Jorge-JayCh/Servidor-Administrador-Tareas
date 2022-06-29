const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async ( req, res = response, next ) => {
    
    const token = req.header( 'x-token');

    if (!token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        //Obtengo el id del usuario mediante el token
        const payload = jwt.verify( token, process.env.PRIVATE_KEY);
        req.usuario = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}