const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the DB successfully"); 
    } catch (error) {
        console.error(`ERROR : ${error.message}`);
    }
    
}

module.exports = {connectDb};