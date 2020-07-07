const { Router, json } = require('express');
const { authenticate } = require('../utils/auth');
const { createComment } = require('../controllers/comments');

const router = Router();

router.post('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    const {
        content
    } = req.body;

    const result = await createComment(postId, content, userId);

    if (result.error) {
        return res
            .status(400)
            .json(result);
    }

    return res
        .status(201)
        .json(result);
})

module.exports = router;