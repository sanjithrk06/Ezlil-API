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
            required : true,
            default : Date.now()
        },
        deliveryDate : {
            type : Date
        },
        shippingAddress : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "addresses",
            required : true
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
            required : true
        },
        totalDiscountedPrice : {
            type : Number,
            required : true
        },
        discount : {
            type : Number,
            required : true
        },
        orderStatus : {
            type : String,
            required : true,
            default : "CONFIRMED"
        },
        totalItems : {
            type : Number,
            required : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("orders", orderSchema);