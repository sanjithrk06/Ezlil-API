const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
        orderItems : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "orderItems"
            }
        ],
        orderDate : {
            type : Date,
            require : true,
            default : Date.now()
        },
        deliveryDate : {
            type : Date
        },
        shippingAddress : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "addresses",
            require : true
        },
        paymentDetails : {
            paymentMethod : {
                type : String
            },
            transactionId : {
                type : String
            },
            paymentId : {
                type : String
            },
            paymentStatus : {
                type : String,
                default : "PENDING"
            }
        },
        totalPrice : {
            type : Number,
            require : true
        },
        totalDiscountedPrice : {
            type : Number,
            require : true
        },
        discounte : {
            type : Number,
            require : true
        },
        orderStatus : {
            type : String,
            require : true
        },
        totalItems : {
            type : Number,
            require : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("orders", orderSchema);