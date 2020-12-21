const {Router} = require('express');

const userRoutes = require('./routes/user.routes');

const routes = Router();

routes.get('', (req, res) => {
  res.json({ hello: "world"});
});

routes.use(userRoutes);

module.exports = routes;