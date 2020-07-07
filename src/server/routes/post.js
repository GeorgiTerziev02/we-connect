const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { createPost, getPostsByUserId } = require('../controllers/posts');

const router = Router();

router.get('/user/:id', authenticate, async (req, res) => {
    const userId = req.params.id;
    const posts = await getPostsByUserId(userId);
    return res
        .status(200)
        .json(posts);
});

router.post('/', authenticate, async (req, res) => {
    await createPost(req, res);
})

module.exports = router;