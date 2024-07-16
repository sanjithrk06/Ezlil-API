const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

cartItemSchema.post('save', async function(doc, next) {
    const cart = await mongoose.model('cart').findById(doc.cart);
    if (cart) await cart.updateTotals();
    next();
});

cartItemSchema.post('updateOne', async function(doc, next) {
    const cartItem = await this.model.findOne(this.getQuery());
    if (cartItem) {
        const cart = await mongoose.model('cart').findById(cartItem.cart);
        if (cart) await cart.updateTotals();
    }
    next();
});

cartItemSchema.post('deleteOne', { document: true, query: false }, async function(doc, next) {
    const cart = await mongoose.model('cart').findById(doc.cart);
    if (cart) await cart.updateTotals();
    next();
});

module.exports = mongoose.model("cartItems", cartItemSchema);
