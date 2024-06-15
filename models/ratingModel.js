const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            require : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "products",
            require : true
        },
        rating : {
            type : Number,
            require : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("ratings", ratingSchema);