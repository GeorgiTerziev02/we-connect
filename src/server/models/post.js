const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    location: {
        type: String,
        maxlength: 100,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    creatorId: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    },
    comments: [{
        type: 'ObjectId',
        ref: 'Comment'
    }],
    likes: [{
        type: 'ObjectId',
        ref: 'User'
    }]
});

postSchema.path('imageUrl').validate(function (value) {
    return value.startsWith('http://') || value.startsWith('https://');
}, 'Image url is not valid');

module.exports = mongoose.model('Post', postSchema);