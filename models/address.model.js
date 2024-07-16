const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        addressLine1 : {
            type : String,
            required : true
        },
        addressLine2 : {
            type : String
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        },
        zipCode : {
            type : Number,
            required : true
        },
        mobile : {
            type : String,
            required : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    },
    { timestamps : true }
)

module.exports = mongoose.model("addresses", addressSchema);