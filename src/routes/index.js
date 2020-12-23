const {Router} = require('express');

const verifyAuth = require('../middlewares/verifyAuth');

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const patientRoutes = require('./patient.routes');
const doctorRoutes = require('./doctor.routes');

const routes = Router();

routes.get('', (req, res) => {
  res.json({ hello: "world"});
});

routes.use(userRoutes);
routes.use(sessionRoutes);
routes.use(doctorRoutes);
routes.use(patientRoutes);

module.exports = routes;