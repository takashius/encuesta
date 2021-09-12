const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('./config');
const router = require("./router");

db(config.dbUrl);

const server = express();
server.use(bodyParser.json());
router(server);

server.listen(config.port, (err) => {
    if (err) throw err;
    console.log(`Listening on http://localhost:${config.port}`);
  });