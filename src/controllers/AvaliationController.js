const Parse = require('parse/node');
const ParseUtils = require('../database/parse_utils');

class Avaliation extends Parse.Object {
    constructor(attributes, options) {
        super('Avaliation', attributes, options);
        this.custumerData = {};
    }
}

exports.getProductAvaliations = async (req, res) => {
    const { produtoId } = req.params;
    try {
        const produtoPointer = ParseUtils.createPointer("Produto", produtoId);

        const query = new Parse.Query(Avaliation);
        query.equalTo("Produto", produtoPointer);
        query.include("RawUser");
        query.select(["coment", "pros", "contras", "RawUser", "rating_custo", 
                    "rating_qualidade", "rating_usabilidade", "up_votos", "down_votos"]);
        const result = await query.find({ useMasterKey: true })

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createAvaliation = async (req, res) => {
    const { comment, pros, contras, userId, rating_custo, produtoId,
            rating_qualidade, rating_usabilidade, up_votos, down_votos } = req.body;
    try {
        const userPointer = ParseUtils.createPointer("RawUsers", userId);
        const produtoPointer = ParseUtils.createPointer("Produto", produtoId);

        const review = new Avaliation();
        review.set("comment", comment);
        review.set("RawUser", userPointer);
        review.set("Produto", produtoPointer);
        review.set("pros", pros);
        review.set("contras", contras);
        review.set("rating_custo", rating_custo);
        review.set("rating_qualidade", rating_qualidade);
        review.set("rating_usabilidade", rating_usabilidade);
        review.set("up_votos", up_votos);
        review.set("down_votos", down_votos);

        const result = await review.save(null, { useMasterKey: true })

        res.status(200).send({objectId: result.id});
    } catch (error) {
        res.status(400).send(error);
    }
}
