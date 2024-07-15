const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        console.log(`Updating cart item for userId: ${userId} and cartItemId: ${cartItemId}`);

        const item = await findCartItemById(cartItemId);

        if (!item) {
            throw new Error(`Cart Item not found: ${cartItemId}`);
        }

        console.log(`Found item with userId: ${item.userId}`);

        const user = await userService.findUserById(userId);

        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }

        console.log(`Found user with _id: ${user._id}`);

        if (item.userId && item.userId.toString() === user._id.toString()) {
            console.log(`Updating item for user: ${userId}`);
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            console.log(`User ID mismatch: item.userId: ${item.userId}, user._id: ${user._id}`);
            throw new Error("You can't update this cart item");
        }

    } catch (error) {
        console.error("Error updating cart item:", error.message);
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    try {
        console.log(`Removing cart item for userId: ${userId} and cartItemId: ${cartItemId}`);

        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(userId);

        if (cartItem.userId && cartItem.userId.toString() === user._id.toString()) {
            await CartItem.findByIdAndDelete(cartItemId);
            return { message: "Cart item removed successfully" };
        } else {
            throw new Error("You can't remove another user's item");
        }
    } catch (error) {
        console.error("Error removing cart item:", error.message);
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
