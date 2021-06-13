const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const avaliationController = require('../controllers/AvaliationController');
const productController = require('../controllers/ProductController');

//Achar um user pelo email
router.get('/user', userController.getUser);
//Criar um user
router.post('/user', userController.createUser);
//update user
router.put('/user', userController.updateUser);
//Achar as avaliacoes de um user
router.get('/user/avaliations', userController.getUserAvaliations);


//Achar avaliacoes de um produto
router.get('/avaliations', avaliationController.getProductAvaliations);
//Criar avaliacoes
router.post('/avaliations', avaliationController.createAvaliation);


//Listar produtos
router.get('/produtos', productController.getProducts);
//Listar produtos cujo o titulo bate com uam substring
router.get('/produtosBySubstring', productController.getProductsBySubstring);
//listar os ultimos produtos
router.get('/produtosLast', productController.getLastProducts);
//listar os ultimos produtos
router.get('/produtos/rating', productController.getProductsRating);


module.exports = router;