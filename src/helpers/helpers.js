const mysqlConn = require("../db/db.js");
// const bcrypt = require('bcrypt');

function helpFunctions() {}


// Gerador de senha criptografada
// helpFunctions.prototype.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // Comparador de senha da tela de logar no sistema
// helpFunctions.prototype.validPassword = function(password, oldPassword) {
//   return bcrypt.compareSync(password, oldPassword, null);
// };

helpFunctions.prototype.execSqlQuery = function(sqlQry, res) {
  mysqlConn.query(sqlQry, function(error, results, fields) {
    if (error) 
      res.json(error);
    else 
      res.json(results);
    
    // fecha a conecão
    // mysqlConn.end();
  });
};

module.exports = new helpFunctions();
