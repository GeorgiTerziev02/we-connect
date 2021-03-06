const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { createComment, updateCommentById, deleteCommentById } = require('../controllers/comments');

const router = Router();

router.post('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    
    const {
        content
    } = req.body;

    const result = await createComment(postId, content, userId);

    return res
        .status(result.error ? 400 : 201)
        .json(result);
});

router.patch('/:id', authenticate, async (req, res) => {
    const commentId = req.params.id;
    const userId = req.userId;
    const {
        content
    } = req.body;

    const result = await updateCommentById(commentId, userId, content);

    res
        .status(result.error ? 400 : 200)
        .json(result);
})

router.delete('/:id', authenticate, async (req, res) => {
    const userId = req.userId;
    const commentId = req.params.id;

    const result = await deleteCommentById(commentId, userId);

    return res
        .status(result.error ? 400 : 204)
        .json(result);
});

module.exports = router;