series = (app) => {
    app.get('/series', (req, res) => {
        var seriesDao = app.models.Series;

        seriesDao.lista()
            .then(resultado => {
                res.send(resultado);
            })
            .catch(erro => {
                console.log('Erro ao consultar: ' + erro);
                res.status(500).send(erro);
            });
    });

    app.post('/series', (req, res) => {
        const seriesDao = app.models.Series;

        let serie = req.body;

        seriesDao.insere(serie)
            .then(resultado => {
                const insertedId = resultado.insertId;
                serie = {id:insertedId, ...serie};
                res.status(201).send(serie);
            })
            .catch(erro => {
                console.log('Erro ao inserir');
                res.status(500).send(erro);
            });
    });

    app.get('/series/:id', (req, res) => {
        const seriesDao = app.models.Series;
        const id = req.params.id;

        seriesDao.buscaPorId(id)
            .then(serie => {
                if(!serie) {
                    res.status(404).send({erro: 'Série não encontrada'});
                } else {
                    res.send(serie);
                }
            })
            .catch(erro => {
                console.log('Erro ao buscar serie!');
                res.status(500).send({erro: 'erro ao buscar'});
            });
    });

    app.put('/series/:id', (req, res) => {
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        seriesDao = app.models.Series;

        seriesDao.atualiza(serie)
            .then(retorno => {
                if(!retorno.affectedRows) {
                    res.status(404).send({erro: 'Serie não encontrada'});
                    return;
                }
                res.send(serie);
            })
            .catch(erro => res.status(500).send(erro));
    });

    app.delete('/series/:id', (req, res) => {
        const seriesDao = app.models.Series;
        const id = req.params.id;

        seriesDao.delete(id)
            .then(serie => {
                if(!retorno.affectedRows) {
                    res.status(404).send({erro: 'Série não encontrada'});
                    return;
                } else {
                    res.status(204).send();
                    return;
                }
            })
            .catch(erro => {
                console.log('Erro ao deletar série!');
                res.status(500).send({erro: 'erro ao deletar!'});
            });
    });
}

// Exportação da variével series
module.exports = series;