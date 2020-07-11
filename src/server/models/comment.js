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
    post: {
        type: 'ObjectId',
        required: true,
        ref: 'Post'
    },
    creator: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);