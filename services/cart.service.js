const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        return await cart.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartItems',
            populate: { path: 'product' }
        });

        if (!cart) {
            return {
                user: userId,
                cartItems: [],
                totalPrice: 0,
                totalDiscountedPrice: 0,
                totalItems: 0
            };
        }

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, { productId }) {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await createCart(userId);
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const existingCartItem = await CartItem.findOne({ cart: cart._id, product: product._id });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            existingCartItem.price = product.price * existingCartItem.quantity;
            existingCartItem.discountedPrice = product.discountedPrice * existingCartItem.quantity;
            await existingCartItem.save();
        } else {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                user: userId, // Ensure user is set
                quantity: 1,
                price: product.price,
                discountedPrice: product.discountedPrice
            });
            await cartItem.save();
            cart.cartItems.push(cartItem);
        }

        await updateCartTotals(cart);
        return "Item added to cart";
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateCartTotals(cart) {
    try {
        const cartItems = await CartItem.find({ cart: cart._id });

        cart.totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        cart.totalDiscountedPrice = cartItems.reduce((total, item) => total + item.discountedPrice, 0);
        cart.totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

        await cart.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createCart,
    findUserCart,
    addCartItem
};
