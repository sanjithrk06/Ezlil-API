const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            require : true
        },
        cartItems : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "cartItems",
            require : true
        }],
        totalPrice : {
            type : Number,
            require : true,
            default : 0
        },
        totalItems : {
            type : Number,
            require : true,
            default : 0
        },
        totalDiscountedPrice : {
            type : Number,
            require : true,
            default : 0
        },
        discount : {
            type : Number,
            require : true,
            default : 0
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("cart", cartSchema);