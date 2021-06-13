const Parse = require('parse/node');
const Moment = require('moment');
const ParseUtils = require('../database/parse_utils');
const { query } = require('express');

class Produto extends Parse.Object {
    constructor(attributes, options) {
        super('Produto', attributes, options);
        this.custumerData = {};
    }
}

exports.getProducts = async (req, res) => {
    try {
        const query = new Parse.Query(Produto);
        query.include("Fabricante");
        const result = await query.find({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getProductById = async (req, res) => {
    const { objectId } = req.query;
    try {
        const query = new Parse.Query(Produto);
        query.include("Fabricante");
        query.equalTo("objectId", objectId);
        const result = await query.first({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getProductsBySubstring = async (req, res) => {
    const { substring } = req.query;
    try {
        const query = new Parse.Query(Produto);
        query.contains("nome", substring);
        const result = await query.find({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getLastProducts = async (req, res) => {
    const nowDate = Moment().subtract(15, "days")
    try {
        const query = new Parse.Query(Produto);
        query.greaterThanOrEqualTo("createdAt", nowDate.toDate());
        const result = await query.find({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getProductsRating = async (req, res) => {
    try {
        const query = new Parse.Query("Avaliation");
        query.select(['Produto', 'rating']);
        const result = await query.find({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

