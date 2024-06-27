const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name : {
            type : String,
            require : true
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("categories", categorySchema);