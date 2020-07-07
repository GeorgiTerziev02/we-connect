const { Router } = require('express');
const { authenticate } = require('../utils/auth');
const { createComment } = require('../controllers/comments');

const router = Router();

router.post('/:id', authenticate, async (req, res) => {
    await createComment(req, res);
})

module.exports = router;