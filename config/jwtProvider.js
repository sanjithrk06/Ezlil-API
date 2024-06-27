const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: "10m" });

    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    return decodedToken.userId;
}

module.exports = {
    generateToken,
    getUserIdFromToken
}