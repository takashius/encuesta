const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('../../middelware/auth');

/*router.get('/', auth(), function (req, res) {
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
});*/

router.get('/', auth(), function (req, res) {
  controller.getEncuesta(req.user._id)
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

router.post('/', auth(), function (req, res) {
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

router.patch('/', auth(), function (req, res) {
  controller.updateEncuesta(req.user._id, req.body)
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

router.delete('/:id', auth(), function (req, res) {
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