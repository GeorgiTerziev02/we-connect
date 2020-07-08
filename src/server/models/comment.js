const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 1000
    },
    createdAt: {
        type: String,
        required: true
    },
    postId: {
        type: 'ObjectId',
        required: true,
        ref: 'Post'
    },
    creatorId: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);