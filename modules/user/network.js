const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('../../middelware/auth');

  router.get('/', function (req, res) {
    controller.getUsers(null)
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
    controller.getUser(req.params.id)
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

  router.get('/type/:type', function (req, res) {
    controller.getUsers(req.params.type)
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
    controller.addUser(req.body)
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
    controller.updateUser(req.body)
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

  router.delete('/', auth(), function (req, res) {
    controller.deleteUser(req.params.id)
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

  router.post('/login', function (req, res) {
    controller.loginUser(req.body)
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

  router.post('/logout', auth(), function (req, res) {
    controller.logoutUser(req.user._id, req.token)
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

  router.post('/logoutall', auth(), function (req, res) {
    controller.logoutAll(req.user._id)
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

  router.post('/account', auth(), function (req, res) {
    controller.getUser(req.user._id)
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

  router.post('/change_password', auth(), function (req, res) {
    controller.changePassword(req.user, req.body.password)
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