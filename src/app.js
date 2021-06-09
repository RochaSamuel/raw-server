const Parse = require('parse/node');

Parse.initialize("hYqvNNWshu88Ch6ItwORC4Prm1otQVLEgbxGh2bB", "vXRUrRxr688q2MLZnScLkE8sKb3X044tnIGxGsP7", "U2zSSZLbcDT5shucFaVlGk3zLSphOz4wkU8mWvFc")
Parse.serverURL = 'https://parseapi.back4app.com/'

const api = require('./routes/api');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

module.exports = app;