const { request, response } = require('express');

const Proyecto = require('../models/proyecto');

const proyectosPost = async ( req, res = response ) => {
    
    const { nombre } = req.body;

    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto({ nombre });
        proyecto.save();
        
        res.json({
            proyecto
        });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear un proyecto =( .');
    }

}

module.exports = {
    proyectosPost
}