const conexao = require('../infra/conexao');

class Series {
    lista() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM series';

            conexao.query(sql, (erro, retorno) => {
                if (erro) 
                    reject('Erro ao consultar: ' + erro);
                else  {
                    console.log('Consulta realizada com sucesso! ');
                    resolve(retorno);
                }
            });
        });
    }

    insere(serie) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO series SET ?';
            console.log(serie)
            conexao.query(sql, serie, (erro, retorno) => {
                if (erro) {
                    reject('Erro ao inserir: ' + erro);
                } else {
                    console.log('Série inserida com sucesso!');
                    resolve(retorno);
                }
            });
        });
    }

    atualiza(serie) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE series SET ? WHERE id = ?';
            console.log(serie)
            conexao.query(sql, [serie, serie.id], (erro, retorno) => {
                if (erro) {
                    reject('Erro ao atualizar: ' + erro);
                } else {
                    console.log('Série inserida com sucesso!');
                    resolve(retorno);
                }
            });
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM series WHERE id = ?';
    
            conexao.query(sql, id, (erro, retorno) => {
                if(erro) {
                    reject('Erro ao buscar: ' + erro);
                } else {
                    resolve(retorno[0]);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM series WHERE id = ?';

            conexao.query(sql, id, (erro, retorno) => {
                if(erro) {
                    reject('Erro ao apagar série: ' + erro);
                } else {
                    resolve(retorno);
                }
            });
        });
    }
}

module.exports = new Series();