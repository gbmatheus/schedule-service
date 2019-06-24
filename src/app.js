const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

const port = 3000;

//configurando a view-engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configurando arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//configurando o body parser para pegar o POSTs mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo a rota
// const router = require('routes/index.js');
// app.use(require(''))
app.use(require("./routes"));

//iniciar o servidor
app.listen(port, function() {
  console.log("API funcionando! \n http://127.0.0.1:3000");
});