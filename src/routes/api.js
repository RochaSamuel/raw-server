const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const avaliationController = require('../controllers/AvaliationController');
const productController = require('../controllers/ProductController');

//Achar um user pelo email
router.get('/user/:email', userController.getUser);
//Criar um user
router.post('/user', userController.createUser);
//Achar as avaliacoes de um user
router.get('/user/avaliations/:email', userController.getUserAvaliations);


//Achar avaliacoes de um produto
router.get('/avaliations/:produtoId', avaliationController.getProductAvaliations);
//Criar avaliacoes
router.post('/avaliations', avaliationController.createAvaliation);


//Listar produtos
router.get('/produtos', productController.getProducts);
//Listar produtos cujo o titulo bate com uam substring
router.get('/produtosBySubstring', productController.getProductsBySubstring);

module.exports = router;