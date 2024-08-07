const cartItemService = require("../services/cartItem.service");

const updateCartItem = async(req, res)=> {
    const user = req.user;

    try {
        const updatedCartItem = await cartItemService.updateCartItem(user.id, req.params.cartItemId, req.body);

        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const removeCartItem = async(req, res)=> {
    const user = req.user;

    try {
        await cartItemService.removeCartItem(user._id, req.params.cartItemId);

        return res.status(200).send({message: "Cart Item removed successfully"});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
}