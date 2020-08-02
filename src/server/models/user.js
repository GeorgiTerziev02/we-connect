const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        //minlength: [3, 'Username should be at least 3 symbols long'],
        //maxlength: [50, 'Username should be less than 50 symbols long'],
        match: [/^[A-Za-z0-9 ]+$/, 'Username contains invalid characters']
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    following:[{
        type: 'ObjectId',
        ref: 'User'
    }],
    followers: [{
        type: 'ObjectId',
        ref: 'User'
    }],
    posts: [{
        type: 'ObjectId',
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);