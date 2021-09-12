const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encuestaSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
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