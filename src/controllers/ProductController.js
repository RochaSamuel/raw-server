const Parse = require('parse/node');
const ParseUtils = require('../database/parse_utils');

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
        query.select(["nome", "info", "descricao"]);
        const result = await query.find({ useMasterKey: true });

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

