const env = process.env.NODE_ENV;
const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorMessages = require('../constants/errorMessages');
const config = require('../config/config')[env];

const router = Router();

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey, { expiresIn: '1h' });

    return token;
};

router.post('/register', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user !== null) {
            return res
                .status(400)
                .json({
                    error: errorMessages.userExists
                });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // TODO: Add validation
        const newUser = new User({ username, password: hashedPassword });
        const userObj = await newUser.save();

        const token = generateToken({
            userId: userObj._id,
            username: userObj.username
        });

        return res
            .status(201)
            .json({
                token
            });

    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                error: errorMessages.databaseUpdateError
            });
    }
})

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user === null) {
            return res
                .status(404)
                .json({
                    error: errorMessages.invalidUsernamePassword
                });
        }

        const status = await bcrypt.compare(password, user.password);

        if (status) {
            const token = generateToken({
                userId: user._id,
                username: user.username
            });

            return res
                .status(200)
                .json({
                    token
                });
        } else {
            return res
                .status(400)
                .json({
                    error: errorMessages.wrongCredentials
                });
        }

    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({
                error: errorMessages.wrongCredentials
            });
    }
});

module.exports = router;