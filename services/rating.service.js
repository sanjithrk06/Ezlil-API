const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

async function createRating(req, user) {
    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        user: user._id,
        product: product._id,
        rating: req.rating,
        createdAt: new Date()
    })

    return await rating.save();
}

async function getAllRating(productId) {
    return await Rating.find({product: productId});
}

module.exports = {
    createRating,
    getAllRating
}