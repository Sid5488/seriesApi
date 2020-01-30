const conexao = require('../infra/conexao');

class Usuarios {
    insere(usuario) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO usuarios SET ?';
            conexao.query(sql, usuario, (erro, retorno) => {
                if(erro) reject('Erro ao salvar: ' + erro);
                else {
                    usuario = {id: retorno.insertId, ...usuario}
                    resolve(usuario);
                }   
            });
        });
    }

    buscarEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuarios WHERE email = ?';

            conexao.query(sql, email, (erro, retorno) => {
                if(erro) 
                    reject('Erro ao buscar: ' + erro);
                else 
                    resolve(retorno[0]);
            });
        });
    }
}

module.exports = new Usuarios();