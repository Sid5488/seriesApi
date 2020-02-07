const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'bcd127',
    database: 'seriesapi'
});

module.exports = conexao;