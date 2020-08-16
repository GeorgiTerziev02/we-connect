const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { followUserById, getFollowing } = require('../controllers/follows');

const router = Router();

router.post('/:id', authenticate, async (req, res) => {
    const followRequesterId = req.userId;
    const followingId = req.params.id;

    const result = await followUserById(followRequesterId, followingId);

    res
        .status(result.error ? 400 : 201)
        .json(result);
});

router.get('/following', authenticate, async (req, res) => {
    const userId = req.userId
    
    const result = await getFollowing(userId)

    return res
        .status(result.error ? 400 : 200)
        .json(result)
})

module.exports = router;