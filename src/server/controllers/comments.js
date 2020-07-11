const Comment = require('../models/comment');
const Post = require('../models/post');
const errorMessages = require('../constants/errorMessages');
const responseMessages = require('../constants/responseMessages');

const createComment = async (postId, content, creator) => {
    try {
        const post = await Post.findById(postId);
        if (!post || post.isDeleted) {
            throw new Error(errorMessages.invalidPostId);
        }
    } catch (error) {
        console.error(error);
        return {
            error: errorMessages.invalidPostId
        };
    }

    if (!content) {
        return {
            error: errorMessages.commentContentRequired
        }
    }

    if (content.length > 1000) {
        return {
            error: errorMessages.commentLength
        };
    }

    const createdAt = new Date().toUTCString();

    try {
        const comment = new Comment({ content, createdAt, post: postId, creator });
        const commentObj = await comment.save();

        const commentId = commentObj._id;
        await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });

        return {
            commentId
        };
    } catch (err) {
        console.error(err);
        return {
            error: errorMessages.databaseUpdateError
        };
    }
}

const updateCommentById = async (commentId, userId, content) => {
    const comment = await Comment.findById(commentId).populate('post');
    
    if (!comment || comment.post.isDeleted) {
        return {
            error: errorMessages.invalidCommentId
        }
    }

    if (JSON.stringify(comment.creator) !== JSON.stringify(userId)) {
        return {
            error: errorMessages.userIdIsNotCommentCreator
        }
    }

    if (!content) {
        return {
            error: errorMessages.commentContentRequired
        }
    }

    if (content.length > 1000) {
        return {
            error: errorMessages.commentLength
        };
    }
    
    try {
        await Comment.findByIdAndUpdate(commentId, { content });
        return {
            message: responseMessages.successfulUpdate
        }
    } catch (err) {
        console.error(err);
        return {
            error: errorMessages.databaseUpdateError
        }
    }
}

const deleteCommentById = async (commentId, userId) => {
    const comment = await Comment.findById(commentId).populate('post').lean();

    if (!comment || comment.post.isDeleted) {
        return {
            error: errorMessages.invalidCommentId
        }
    }

    const userIdString = JSON.stringify(userId);
    if (userIdString !== JSON.stringify(comment.creator) && userIdString !== JSON.stringify(comment.post.creator)) {
        return {
            error: errorMessages.userIdNotCreatorPostAndComment
        };
    }

    try {
        await Comment.findByIdAndDelete(commentId);
        await Post.findByIdAndUpdate(comment.post, { $pullAll: { comments: [commentId] } });

        return {
            message: responseMessages.successfulDelete
        };
    } catch (err) {
        console.error(err);
        return {
            error: errorMessages.databaseUpdateError
        };
    }
};

module.exports = {
    createComment,
    updateCommentById,
    deleteCommentById
}