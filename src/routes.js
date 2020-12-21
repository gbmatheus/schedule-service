const {Router} = require('express');

const userRoutes = require('./routes/user.routes');
const doctorRoutes = require('./routes/doctor.routes');

const routes = Router();

routes.get('', (req, res) => {
  res.json({ hello: "world"});
});

routes.use(userRoutes);
routes.use(doctorRoutes);

module.exports = routes;