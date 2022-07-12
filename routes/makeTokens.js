const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id, 
        isAdmin: user.isAdmin
    }, process.env.JWT_SEC, {expiresIn: "30min"});
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id, 
        isAdmin: user.isAdmin
    }, process.env.JWT_REF_SEC);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}