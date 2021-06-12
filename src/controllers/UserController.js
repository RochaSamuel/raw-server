const Parse = require('parse/node');
const ParseUtils = require('../database/parse_utils');

class RawUsers extends Parse.Object {
    constructor(attributes, options) {
        super('RawUsers', attributes, options);
        this.custumerData = {};
    }
}

exports.getUser = async (req, res) => {
    const { email } = req.query;
    try {
        const query = new Parse.Query(RawUsers);
        query.equalTo("email", email);
        query.select(["nome", "sobrenome", "quem_sou", "foto", "email"]);
        const result = await query.first({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getUserAvaliations = async(req, res) => {
    const { email } = req.query;
    try {
        const queryUser = new Parse.Query(RawUsers);
        queryUser.equalTo("email", email);
        const userResult = await queryUser.first({ useMasterKey: true });

        const userPointer = ParseUtils.createPointer("RawUsers", userResult.id);

        const query = new Parse.Query("Avaliation");
        query.equalTo("RawUser", userPointer);
        query.include("Produto");
        const result = await query.find({ useMasterKey: true });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createUser = async (req, res) => {
    const { nome, sobrenome, quem_sou, email } = req.body;
    try {
        const query = new Parse.Query(RawUsers);
        query.equalTo("email", email);
        const exists = await query.count({ useMasterKey: true })
    
        if(exists > 0) {
            res.status(400).send('Já existe uma conta com esses dados');
        } else {
            const user = new RawUsers();
            user.set("nome", nome);
            user.set("sobrenome", sobrenome);
            user.set("quem_sou", quem_sou);
            user.set("email", email);
    
            const result = await user.save(null, { useMasterKey: true });
    
            res.status(200).send({objectId: result.id});
        }

    } catch (error) {
        res.status(400).send(error);
    }
}
