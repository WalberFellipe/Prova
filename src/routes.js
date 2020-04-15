const express = require('express');

const banco = require('./banco');

const routes = express.Router();

routes.post('/banco', banco.store);

module.exports = routes;