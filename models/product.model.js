const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const generateSKU = () => {
    return `SKU-${uuidv4()}`;
};

const productSchema = new Schema(
    {
        SKU : {
            type: String,
            default: generateSKU
        },
        title : {
            type: String,
            required: true
        },
        description : {  
            type: String,
            required: true
        },
        price : {
            type: Number,
            required: true
        },
        discountedPrice : {
            type: Number,
            required: true
        },
        discountPersent : {
            type: Number,
            required: true
        },
        quantity : {
            type: Number,
            required: true
        },
        brand : {
            type: String
        },
        imageUrl: {
            type: String, 
            required: true
        },
        ratings : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "ratings"
            }
        ],
        reviews : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "reviews"
            }
        ],
        numRatings : {
            type : Number,
            default : 0
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "categories"
        },
        weight : {
            type : String
        },
        manufacturer : {
            type : String
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('products', productSchema)