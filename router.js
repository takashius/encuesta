const user = require('./modules/user/network');
const encuesta = require('./modules/encuesta/network');
const preguntas = require('./modules/preguntas/network');

const routes = function (server) {
    server.use('/user', user);
    server.use('/encuesta', encuesta);
    server.use('/preguntas', preguntas);
}

module.exports = routes;