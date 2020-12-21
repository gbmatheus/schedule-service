const express = require('express');

const routes = require('./routes.js');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started http://localhost:3333');
})