const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
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
        review : {
            type : String,
            require : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("reviews", reviewSchema);