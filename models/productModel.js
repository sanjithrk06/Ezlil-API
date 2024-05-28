const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    SKU: {
        type: String,
        required: true,
        unique: true
    },
    p_name: {
        type: String,
        required: true
    },
    p_description: {  
        type: String,
        required: true
    },
    p_category: {
        type: String,
        required: true
    },
    regular_price: {
        type: Number,
        required: true
    },
    sales_price: {
        type: Number,
        required: true
    },
    quantity_available: {
        type: Number,
        required: true
    },
    p_image: {
        type: String, 
        required: true
    },
    weight_volume: {
        type: String
    },
    ingredients: {
        type: String
    },
    manufacturer: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)