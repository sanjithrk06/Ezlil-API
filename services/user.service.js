const User = require("../models/user.model");
const Address = require("../models/address.model");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createUser = async(userData)=> {
    try {
        const {firstName, lastName, email, password} = userData;
    
        //validation
        if (!email) {
        throw Error("email fields must be filled");
        }
        if (!password) {
        throw Error("pass fields must be filled");
        }
    
        if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
        }
        if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
        }
    
        const exists = await User.findOne({ email });
    
        if (exists) {
        throw Error("Email already in use");
        }
    
        // bcrypting the pass
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            password: hash
        });
    
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
  

const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId).populate("address");

        if(!user) {
            throw new Error("User not found with id : ", userId);
        }

        return user;
    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({email});

        if(!user) {
            throw new Error("User not found with email : ", email);
        }

        return user;
    } catch (err) {
        throw new Error(err.message)
    }
}

const getUserProfileByToken = async(token) => {
    try {

        const userId = jwtProvider.getUserIdFromToken(token);

        const user = await findUserById(userId);

        if(!user) {
            throw new Error("User not found with id :", userId);
        }

        return user;

    } catch (err) {
        throw new Error(err.message)
    }
}

const getAllUsers = async()=> {
    try {
        const users = await User.find();

        return users;
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers
}