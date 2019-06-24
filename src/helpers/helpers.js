const mysqlConn = require("../db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv-safe").load();

function helpFunctions() {}

// Gerador de senha criptografada
helpFunctions.prototype.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Comparador de senha da tela de logar no sistema
// helpFunctions.prototype.validPassword = function(password, oldPassword) {
//   return bcrypt.compareSync(password, oldPassword, null);
// };

helpFunctions.prototype.execSqlQuery = function(sqlQry, res) {
  mysqlConn.query(sqlQry, function(error, results, fields) {
    if (error) res.json(error);
    else {
      res.json(results);
      console.log("- ", JSON.stringify(results));
    }
  });
};

//Teste execução de query com promise
helpFunctions.prototype.execSQLQueryPromise = function(sqlQry) {
  return new Promise((resolve, reject) => {
    mysqlConn.query(sqlQry, (error, results) => {
      if (error) return reject(error);
      else resolve(results);
    });
  });
};

//Execução de query, callback com promise na chamada
helpFunctions.prototype.execNoPromise = function(sqlQry, callback) {
  mysqlConn.query(sqlQry, callback);
};

//Finalizar conexão
helpFunctions.prototype.endConn = () => {
  mysqlConn.end();
};

helpFunctions.prototype.generateToken = id => {
  var token = jwt.sign({ id }, process.env.SECRET);
  return token;
};

helpFunctions.prototype.verifyJWT = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "No token provided. " });

  jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to autheticate token" });

    //se tudo estiver ok, salve no request para uso posterior
    req.userID = decode.id;
    next();
  });
};

// helpFunctions.prototype.verifyAuthorize = (req, res, next) => {
//   if (req.permissao == "a")
//     // res.redirect();//painel do admin
//     res.status(200).send({ auth: true, token: token, message: "admin" });
//   else if (result[0].permissao == "m")
//     // res.redirect();//aréa do médico
//     res.status(200).send({ auth: true, token: token, message: "medico" });
//   else if (result[0].permissao == "p")
//     // res.redirect();//aréa do paciente
//     res.status(200).send({ auth: true, token: token, message: "paciente" });
//   // res.redirect();
//   else res.status(200).send({ auth: true, token: token, message: "usuario" });
// };

module.exports = new helpFunctions();
