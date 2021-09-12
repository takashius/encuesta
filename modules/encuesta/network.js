const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', function (req, res) {
  controller.getEncuestas()
    .then((data) => {
        res.status(data.status).send(data.message);
    }).catch(e => {
        console.log(e);
        res.status(500).send({
            error: 'Unexpected Error',
            detail: e
        });
    });
});

router.get('/:id', function (req, res) {
  controller.getEncuesta(req.params.id)
    .then((data) => {
        res.status(data.status).send(data.message);
    }).catch(e => {
        console.log(e);
        res.status(500).send({
            error: 'Unexpected Error',
            detail: e
        });
    });
});

router.post('/', function (req, res) {
  controller.setEncuesta(req.body)
    .then((data) => {
        res.status(data.status).send(data.message);
    }).catch(e => {
        console.log(e);
        res.status(500).send({
            error: 'Unexpected Error',
            detail: e
        });
    });
});

router.patch('/', function (req, res) {
  controller.updateEncuesta(req.body)
    .then((data) => {
        res.status(data.status).send(data.message);
    }).catch(e => {
        console.log(e);
        res.status(500).send({
            error: 'Unexpected Error',
            detail: e
        });
    });
});

router.delete('/:id', function (req, res) {
  controller.deleteEncuesta(req.params.id)
    .then((data) => {
        res.status(data.status).send(data.message);
    }).catch(e => {
        console.log(e);
        res.status(500).send({
            error: 'Unexpected Error',
            detail: e
        });
    });
});

module.exports = router;