const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
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
        rating : {
            type : Number,
            required : true
        }
    },
    { timestamps : true }
);

module.exports = mongoose.model("ratings", ratingSchema);