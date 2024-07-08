const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
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
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('products', productSchema)