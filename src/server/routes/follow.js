const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { followUserById } = require('../controllers/follows');

const router = Router();

router.post('/:id', authenticate, async (req, res) => {
    const followRequesterId = req.userId;
    const followingId = req.params.id;

    const result = await followUserById(followRequesterId, followingId);

    res
        .status(result.error ? 400 : 201)
        .json(result);
});

module.exports = router;