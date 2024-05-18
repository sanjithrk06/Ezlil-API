const express = require('express')
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct, upload } = require('../controllers/productController')

const router = express.Router()


// GET all the products
router.get('/', getProducts)

// GET a single workout
router.get('/:id', getProduct)

// POST a new product
router.post('/', upload.single('p_image'), createProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// UPDATE a product
router.patch('/:id', updateProduct)

module.exports = router