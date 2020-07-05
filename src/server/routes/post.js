const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { createPost } = require('../controllers/posts');

const router = Router();

router.post('/posts', authenticate, async (req, res) => {
    await createPost(req, res);
})

module.exports = router;