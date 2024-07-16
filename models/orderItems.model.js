const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "products",
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        discountedPrice : {
            type : Number,
            required : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            required : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("orderItems", orderItemSchema);