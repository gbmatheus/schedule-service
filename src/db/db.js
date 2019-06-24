const mysql = require('mysql');

// criando a conexão com o Banco de Dados
const connection = mysql.createConnection({
    host: '127.0.0.1',//servidor
    port: '3306',//porta
    user: 'root',//usuário
    password: '',//senha
    database: 'hospital'//banco
});

// Verificando a conexão
connection.connect(function (err) {
    if(err)
        return console.log(err);
    console.log('Conexão DB OK!'); 
});

// connection.Promise = global.Promise;

module.exports = connection;

// const pool = mysql.createPool({
//     connectionLimit,
//     host: '127.0.0.1',//servidor
//     port: '3306',//porta
//     user: 'root',//usuário
//     password: '',//senha
//     database: 'hospital'//banco
// });

// console.log('pool => criado');

// pool.on('release', () => console.log('pool => conexão retornada'));

// process.on('SIGINT', () => pool.end(
//    err => {
//        if(err) return console.log(err);
//        console.log('pool => fechado');
//        process.exit(0);
//    })
// );

// module.exports = pool;