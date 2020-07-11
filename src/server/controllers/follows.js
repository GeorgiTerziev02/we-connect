const User = require('../models/user');
const errorMessages = require('../constants/errorMessages');
const responseMessages = require('../constants/responseMessages');

const followUserById = async (followRequesterId, followingId) => {
    if (followRequesterId === followingId) {
        return {
            error: errorMessages.cannotFollowYourself
        }
    }

    const following = await User.findById(followingId).lean();
    
    if (!following) {
        return {
            error: errorMessages.invalidUserId
        }
    }

    try {
        if (JSON.stringify(following.followers).includes(followRequesterId.toString())) {
            await User.findByIdAndUpdate(followingId, { $pullAll: { followers: [followRequesterId] } });
            await User.findByIdAndUpdate(followRequesterId, { $pullAll: { following: [followingId] } });
          return {
            message: responseMessages.unfollowed
          }
        } else {
            await User.findByIdAndUpdate(followingId, { $push: { followers: followRequesterId } });
            await User.findByIdAndUpdate(followRequesterId, { $push: {following: followingId} });
      
          return {
            message: responseMessages.followed
          }
        }
    } catch (err) {
        console.error(err);
        return {
            error: errorMessages.databaseUpdateError
        }
    }
};

module.exports = {
    followUserById
}