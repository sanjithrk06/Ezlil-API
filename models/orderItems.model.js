const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "products",
            require : true
        },
        quantity : {
            type : Number,
            require : true
        },
        price : {
            type : Number,
            require : true
        },
        discountedPrice : {
            type : Number,
            require : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            require : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("orderItems", orderItemSchema);