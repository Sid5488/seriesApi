const { validationResult } = require('express-validator');
const usuarioDAO = new (require('../models/Usuarios'))();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/auth.json');

gerarToken = (params) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 900,
    });
}

module.exports = {
    async registra(req, res) {
        const erros = validationResult(req);

        if(!erros.isEmpty()) 
            return res.status(400).send(erros);
        let usuario = req.body;
        try {

            console.log(usuario)

            usuario.senha = await bcrypt.hash(usuario.senha, 10)

    
            const resultado = await usuarioDAO.insere(usuario);
            usuario = {id: resultado.insertId, ...usuario};
    
            return res.status(201).send({
                usuario,
                token: gerarToken({id: usuario.id})
            });
        } catch(erro) {
            return res.status(500).send(erro);
        }
    },

    async autentica(req, res) {
        const { email, senha } = req.body;

        try {
            let usuario = await usuarioDAO.buscarEmail(email);
            usuario = usuario[0]

            if(!usuario)
                return res.status(400).send({erro: 'Usuário não cadastrado'});
            
            if(!await bcrypt.compare(senha, usuario.senha))
                return res.status(400).send({erro: 'Senha inválida'});

            delete usuario.senha;

            res.send({
                usuario,
                token: gerarToken({id: usuario.id})
            });
        } catch(erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    }
}