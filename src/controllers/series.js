const serieDAO = new (require('../models/Series'))();

module.exports = {
    async listar(req, res)  {
        const lista = await serieDAO.lista();

        if(lista)
            return res.send(lista);
        return res.status(404).send({erro: 'Lista vazia'});
    },

    async insere(req, res) {
        let serie = req.body;

        try {
            const resultado = await serieDAO.insere(serie);
    
            const insertId = resultado.insertId;
            serie = {id:insertId, ...serie}
            return res.status(201).send(serie);
        } catch(erro) {
            return res.status(400).send({erro});
        }
    },

    async buscarPorId(req, res) {
        const id = req.body.id;

        const serie = await seriesDao.buscaPorId(id);

        if(!serie)
            return res.status(404).send({erro: 'Série não encontrada'});
        res.send(serie);
    },

    async atualiza(req, res) {
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        serie = await serieDAO.atualiza(serie);

        if(!serie) 
            return res.status(404).send({erro: 'Série não encontrada'});
        res.send(serie);
    },

    async delete(req, res) {
        const id = req.params.id;

        const retorno = await serieDAO.delete(id);

        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'Série não encontrada'});
        res.status(204).send();
    }
}