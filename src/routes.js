const {Router} = require('express');

const userRoutes = require('./routes/user.routes');
const patientRoutes = require('./routes/patient.routes');

const routes = Router();

routes.get('', (req, res) => {
  res.json({ hello: "world"});
});

routes.use(userRoutes);
routes.use(patientRoutes);

module.exports = routes;