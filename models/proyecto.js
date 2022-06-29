const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        trim: true // Elimina espacios inicio y final
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model( 'Proyecto', ProyectoSchema );