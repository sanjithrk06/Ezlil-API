const express = require('express')
const { getCustomers, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/customersController')

const router = express.Router()


// GET all the customers
router.get('/', getCustomers)

// GET a single customer
router.get('/:id', getCustomer)

// UPDATE a customer
router.patch('/:id', updateCustomer)

// DELETE a customer
router.delete('/:id', deleteCustomer)

module.exports = router