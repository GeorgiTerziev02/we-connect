const { Router } = require('express');
const formidable = require('formidable');
const { authenticate } = require('../utils/auth');
const { createPost, getPostsByUserId, getPostById, likePost, editPostById, deletePostById } = require('../controllers/posts');

const router = Router();

router.get('/user/:id', authenticate, async (req, res) => {
    const userId = req.params.id;
    const result = await getPostsByUserId(userId);

    return res
        .status(result.error ? 400 : 200)
        .json(result);
});

router.post('/', authenticate, (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err)
            next('1', err);
            return;
        }

        const {
            description,
            location
        } = fields;
        const userId = req.userId;

        createPost(description, location, userId, files.image, (result) => {
            return res
                .status(result.error ? 400 : 201)
                .json(result);
        });
    });
})

router.get('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const result = await getPostById(postId);

    return res
        .status(result.error ? 400 : 200)
        .json(result);
});

router.post('/like/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const result = await likePost(postId, userId);

    return res
        .status(result.error ? 400 : 201)
        .json(result);
});

router.patch('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    const {
        description,
        location
    } = req.body;

    const result = await editPostById(postId, userId, description, location);

    res
        .status(result.error ? 400 : 200)
        .json(result);
});

router.delete('/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const result = await deletePostById(postId, userId);

    res
        .status(result.error ? 400 : 204)
        .json(result);
})

module.exports = router;