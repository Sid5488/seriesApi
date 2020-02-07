const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({erro: 'Token não encontrado'});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({erro: 'Token mal formatado'});
    
    const [ bearer, token] = parts;

    jwt.verify(token, authConfig.secret, (erro, user) => {
        if(!erro) return res.status(401).send({erro: 'Token inválido'});

        req.userId = user.id;
        
        return next();
    });
});

const customExpress = () => {
    app.use(bodyParser.json());

    // Injeção de dependência de controller
    consign()
    .include('controllers')
    .include('models')
    .into(app);

    return app;
}

module.exports = customExpress();