const { validationResult } = require('express-validator');
const UsuarioValidator = require('../validators/usuario');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

gerarToken = (params) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 60,
    });
}

autenticacao = (app) => {
    app.post('/registrar', UsuarioValidator.validacoes(), (req, res) => {
        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            res.status(400).send(erros);
            return;
        }

        const usuario = req.body;

        usuarioDao = app.models.Usuarios;
        usuarioDao.insere(usuario)
            .then(usuario => {
                const token  = gerarToken({id: usuario.id});
                res.status(201).send({usuario, token});
            })
            .catch(erro => res.status(500).send(erro));
    });

    app.post('/autenticar', async (req, res) => {
        const { email, senha } = req.body;

        try {
            usuarioDao = app.models.Usuarios;
            const usuario = await usuarioDao.buscarEmail(email);

            if(!usuario) 
                return res.status(400).send({erro: 'Usuário não cadastrado'});
            if(usuario.senha != senha)
                return res.status(400).send({erro: 'Senha inválida'});

                const token  = gerarToken({id: usuario.id});

            res.send({usuario, token});
        } catch(erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    });
}

module.exports = autenticacao;