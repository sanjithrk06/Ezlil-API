const express = require('express')
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct, upload } = require('../controllers/productController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all the workout routes
// router.use(requireAuth)

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