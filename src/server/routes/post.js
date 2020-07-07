const { Router, json } = require('express');
const { authenticate } = require('../utils/auth');
const { createPost, getPostsByUserId, getPostById } = require('../controllers/posts');

const router = Router();

router.get('/user/:id', authenticate, async (req, res) => {
    const userId = req.params.id;
    const result = await getPostsByUserId(userId);

    if (result.error) {
        return res
            .status(400)
            .json(result);
    }
    
    return res
        .status(200)
        .json(result);
});

router.post('/', authenticate, async (req, res) => {
    await createPost(req, res);
})

router.get('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const result = await getPostById(postId);

    if (result.error) {
        return res
            .status(400)
            .json(result);
    }

    return res
        .status(200)
        .json(result);
});

module.exports = router;