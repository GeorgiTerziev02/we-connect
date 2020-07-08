const Comment = require('../models/comment');
const Post = require('../models/post');

const createComment = async (postId, content, creatorId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Invalid post id!");
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Invalid post id!"
        };
    }

    if (!content) {
        return {
            error: "Comment content is required"
        }
    }

    if (content.length > 1000) {
        return {
            error: "Comment content length should be less or equal to 1000 symbols!"
        };
    }

    const createdAt = new Date().toUTCString();

    try {
        const comment = new Comment({ content, createdAt, postId, creatorId });
        const commentObj = await comment.save();

        const commentId = commentObj._id;
        await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });

        return {
            commentId
        };
    } catch (err) {
        console.error(err);
        return {
            error: "Error occured while updating the database!"
        };
    }
}

const deleteCommentById = async (commentId, userId) => {
    const comment = await Comment.findById(commentId).lean();

    if (!comment) {
        return {
            error: "Invalid commentId!"
        }
    }

    if (JSON.stringify(userId) !== JSON.stringify(comment.creatorId)) {
        return {
            error: "Given userId is not the creator of the comment!"
        };
    }

    try {
        await Comment.findByIdAndDelete(commentId);
        await Post.findByIdAndUpdate(comment.postId, { $pullAll: { comments: [commentId] } });

        return {
            message: "Successfully deleted!"
        };
    } catch (err) {
        console.error(err);
        return {
            error: "Error occured while updating the database!"
        };
    }
};

module.exports = {
    createComment,
    deleteCommentById
}