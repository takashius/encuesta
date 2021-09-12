const user = require('./modules/user/network');
const encuesta = require('./modules/encuesta/network');

const routes = function (server) {
    server.use('/user', user);
    server.use('/encuesta', encuesta);
}

module.exports = routes;