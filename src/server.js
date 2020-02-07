const express = require('express');
const app = express();

app.use(express.json());

const auth = require('./routes/authRoutes');
const series = require('./routes/seriesRoutes');

app.use('/auth', auth);
app.use('/series', series);

module.exports = app;