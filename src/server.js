const express = require('express');
const app = express();
const cors = require('cors');
const authMid = require('./middlewares/auth');

app.use(express.json());

app.use(cors());

// let allowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', '*')
//     next();
// }

// app.use(allowCrossDomain);

const auth = require('./routes/authRoutes');
const series = require('./routes/seriesRoutes');

app.use('/auth', auth);

app.use(authMid);

app.use('/series', series);

module.exports = app;