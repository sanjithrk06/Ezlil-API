const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);

        if (!item) {
            throw new Error(`Cart Item not found: ${cartItemId}`);
        }


        const user = await userService.findUserById(userId);

        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }

        if (item.user && item.user.toString() === user._id.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You can't update this cart item");
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    try {
        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(userId);

        if (cartItem.user && cartItem.user.toString() === user._id.toString()) {
            await CartItem.findByIdAndDelete(cartItemId);
            return { message: "Cart item removed successfully" };
        } else {
            throw new Error("You can't remove another user's item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findCartItemById(cartItemId) {
    try {
        const cartItem = await CartItem.findById(cartItemId).populate('product');
        if (cartItem) {
            return cartItem;
        } else {
            throw new Error(`Cart item not found with id: ${cartItemId}`);
        }
    } catch (error) {
        console.error("Error finding cart item:", error.message);
        throw new Error(error.message);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
};
