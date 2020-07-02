const env = process.env.NODE_ENV;
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

const authenticate = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        return res
            .status(401)
            .json({
            error: "Missing authorization header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const userObj = jwt.verify(token, config.privateKey);
        req.userId = userObj.userId;
        req.username = userObj.username;
        next();
    } catch (e) {
        return res
            .status(401)
            .json({
            error: "Not authenticated"
        });
    }
};

module.exports = {
    authenticate
}