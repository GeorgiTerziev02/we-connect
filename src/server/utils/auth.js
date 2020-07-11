const env = process.env.NODE_ENV;
const jwt = require('jsonwebtoken');
const errorMessages = require('../constants/errorMessages');
const config = require('../config/config')[env];

const authenticate = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        return res
            .status(401)
            .json({
            error: errorMessages.missingAuth
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
            error: errorMessages.notAuthenticated
        });
    }
};

module.exports = {
    authenticate
}