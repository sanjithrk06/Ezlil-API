const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            required : true
        },
        cartItems : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "cartItems",
            required : true
        }],
        totalPrice : {
            type : Number,
            required : true,
            default : 0
        },
        totalItems : {
            type : Number,
            required : true,
            default : 0
        },
        totalDiscountedPrice : {
            type : Number,
            required : true,
            default : 0
        },
        discount : {
            type : Number,
            required : true,
            default : 0
        }
    },
    { timestamps : true }
);

cartSchema.pre('save', async function(next) {
    try {
        const cart = this;
        const cartItems = await mongoose.model('cartItems').find({ cart: cart._id });

        let totalPrice = 0;
        let totalItems = 0;
        let totalDiscountedPrice = 0;

        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;
            totalDiscountedPrice += item.discountedPrice * item.quantity;
        });

        cart.totalPrice = totalPrice;
        cart.totalItems = totalItems;
        cart.totalDiscountedPrice = totalDiscountedPrice;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("cart", cartSchema);