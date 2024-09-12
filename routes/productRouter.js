// import controllers review, products
const productController = require('../controllers/productController.js') 
const reviewController = require('../controllers/reviewController.js')

const express = require('express');

// router
const router = express.Router();


// use routers
router.post('/addProduct',   productController.addProduct) 

router.get('/getProducts',   productController.getAllproducts) 



// review url controller

router.post('/addReview',  reviewController.addReview)
router.post('/allReview', reviewController.getAllreview)

router.post('/getOnereview', reviewController.getOnereview)


router.get('/:productId',   productController.getOneProduct) 

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProducts)

router.post('/getPublishedProduct', productController.getPublishedProducts)


module.exports = router;
