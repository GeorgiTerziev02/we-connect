const Comment = require('../models/comment');
const Post = require('../models/post');

const createComment = async (req, res) => {
    const postId = req.params.id;

    try {
        await Post.findById(postId);
    } catch (error) {
        res
            .status(400)
            .json({
                error: "Invalid post id!"
            })
    }
    
    const {
        content
    } = req.body;

    if (content.length > 1000) {
        return res
            .status(400)
            .json({
                error: "Comment content length should be less or equal to 1000 symbols!"
            });
    }

    const createdAt = new Date().toUTCString();
    const creatorId = req.userId;

    try {
        const comment = new Comment({ content, createdAt, postId, creatorId });
        const commentObj = await comment.save();

        const commentId = commentObj._id;
        await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });

        return res
            .status(201)
            .json({
                commentId
            });
    } catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({
                error: "Error occured while updating the database!"
            })
    }
}

module.exports = {
    createComment
}