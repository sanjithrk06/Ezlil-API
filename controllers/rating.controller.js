const ratingService = require("../services/rating.service");


const createRating = async(req, res) => {
    const user = req.user;
    
    try {
        const rating = await ratingService.createRating(req.body, user);

        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const getAllRating = async(req, res) => {
    const productId = req.params.productId;
    
    try {
        const ratings = await ratingService.getAllRating(productId);

        return res.status(201).send(ratings);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = {
    createRating,
    getAllRating
}