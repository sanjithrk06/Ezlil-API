const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);

        if(!item) {
            throw new Error("Cart Item not found : ", cartItemId)
        }

        const user = await userService.findUserById(item.userId);

        if(!user) {
            throw new Error("User not found : ", userId)
        }

        if(user._id.toString === userId.toString) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        }else {
            throw new Error("You can't update this cart")
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId, cartItemId) {
    console.log(cartItemId);
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if(user._id.toString === cartItem.userId.toString) {
        await CartItem.findByIdAndDelete(cartItemId)
    }
    throw new Error("You can't remove another user's item");
}

async function findCartItemById(userId, cartItemId) {
    const cartItem = await CartItem.findById(cartItemId);
    if(cartItem) {
        return cartItem;
    }else {
        throw new Error("Cartitem not found with id :", cartItemId)
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}