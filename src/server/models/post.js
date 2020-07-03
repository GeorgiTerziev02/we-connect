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
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: false
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