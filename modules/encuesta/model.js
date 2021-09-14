const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encuestaSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    preguntas: [{
        pregunta: {
            type: Schema.ObjectId,
            ref: 'Preguntas',
        },
        respuesta: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now
        },
    }],
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
});

const Encuesta = mongoose.model('encuesta', encuestaSchema);
module.exports = Encuesta;