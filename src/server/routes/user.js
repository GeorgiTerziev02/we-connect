const env = process.env.NODE_ENV;
const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorMessages = require('../constants/errorMessages');
const config = require('../config/config')[env];
const { verifyToken, authenticate } = require('../utils/auth');
const { searchUsers } = require('../controllers/users');
const auth = require('../utils/auth');

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

        if (!username) {
            return res
                .status(400)
                .json({
                    error: errorMessages.usernameRequired
                })
        }

        if (username.length < 3 || username.length > 50) {
            return res
                .status(400)
                .json({
                    error: errorMessages.usernameLength
                })
        }

        if (!username.match(/^[A-Za-z0-9 ]+$/)) {
            return res
                .status(400)
                .json({
                    error: errorMessages.usernameContainsInvalindSymbols
                })
        }

        if (!password) {
            return res
                .status(400)
                .json({
                    error: errorMessages.passwordRequired
                })
        }

        if (password.length < 6 || password.length > 20) {
            return res
                .status(400)
                .json({
                    error: errorMessages.passwordRequired
                })
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        const userObj = await newUser.save();

        const token = generateToken({
            userId: userObj._id,
            username: userObj.username
        });

        return res
            .status(201)
            .json({
                token,
                userId: userObj._id,
                username: userObj.username
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
                    token,
                    userId: user._id,
                    username: user.username
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

router.post('/verify', async (req, res) => {
    const token = req.headers.authorization || '';
    const data = await verifyToken(token)

    return res
        .status(data.status ? 200 : 401)
        .json(data);
})

router.get('/search/:search', authenticate, async (req, res) => {
    const params = req.params.search

    const results = await searchUsers(params)

    return res
        .status(200)
        .json(results);
})

module.exports = router;