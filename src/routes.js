// import {Router} from 'express';
const {Router} = require('express');

const routes = Router();

routes.get('', (req, res) => {
  res.json({ hello: "world"});
});

module.exports = routes;