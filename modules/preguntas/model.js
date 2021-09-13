const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preguntasSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Preguntas = mongoose.model('preguntas', preguntasSchema);
module.exports = Preguntas;