const Product = require('../models/productModel')
const mongoose = require('mongoose')


// GET all the products
const getProducts = async(req, res) => {
    
    const products = await Product.find().sort({createdAt: -1})

    if(products.length==0){
        return res.status(200).json({message: 'No products found'})
    }

    res.status(200).json(products)
}

//get a single product
const getProduct = async(req, res) => {
    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product found'})
    }

    const product = await Product.findById(id)

    if(!product) {
        return res.status(404).json({error: 'No such product found'})
    }

    res.status(200).json(product)
}

//create a new product
const createProduct = async (req, res) => {
    console.log(` request sent: ${req.body}`)
    const { 
        SKU,
        p_name,
        p_description,
        p_category,
        regular_price,
        sales_price,
        quantity_available,
        p_image,
        weight_volume,
        ingredients,
        manufacturer_brand,
        status
    } = req.body


    let emptyFields = []

    if(!SKU) {
        emptyFields.push('SKU')
    }
    if(!p_name) {
        emptyFields.push('p_name')
    }
    if(!p_description) {
        emptyFields.push('p_description')
    }
    if(!p_category) {
        emptyFields.push('p_category')
    }
    if(!regular_price) {
        emptyFields.push('regular_price')
    }
    if(!sales_price) {
        emptyFields.push('sales_price')
    }
    if(!quantity_available) {
        emptyFields.push('quantity_available')
    }
    if(!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add to the database
    try {
        const product = await Product.create({ 
            SKU,
            p_name,
            p_description,
            p_category,
            regular_price,
            sales_price,
            quantity_available,
            p_image,
            weight_volume,
            ingredients,
            manufacturer_brand,
            status
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// delete a product
const deleteProduct = async(req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product found'})
    }

    const product = await Product.findByIdAndDelete(id)

    if(!product) {
        return res.status(404).json({error: 'No such product found'})
    }

    res.status(200).json(product)

}

//update a product
const updateProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such product found'})
    }

    const product = await Product.findByIdAndUpdate(id, {
        ...req.body
    })

    if(!product) {
        return res.status(404).json({error: 'No such product found'})
    }

    res.status(200).json(product)
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}