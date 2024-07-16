const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            required : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "products",
            required : true
        },
        review : {
            type : String,
            required : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("reviews", reviewSchema);