const mobile = require('./routes/mobile');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/mobile', mobile);

module.exports = app;