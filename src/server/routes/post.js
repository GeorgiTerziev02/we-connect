const { Router } = require('express');
const formidable = require('formidable');
const { authenticate } = require('../utils/auth');
const { createPost, getPostsByUserId, getPostById, likePost } = require('../controllers/posts');

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

router.post('/', authenticate, (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next('1', err);
            return;
        }

        const {
            description,
            location
        } = fields;
        const userId = req.userId;

        createPost(description, location, userId, files.image, (result) => {
            if (result.error) {
                return res
                    .status(400)
                    .json(result);
            }
    
            return res
                .status(201)
                .json(result);
        });
    });
    //await createPost(req, res);
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

router.post('/like/:id', authenticate, async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    const result = await likePost(postId, userId);

    if (result.error) {
        return res
            .status(400)
            .json(result);
    }

    return res
        .status(201)
        .json(result);
});

module.exports = router;