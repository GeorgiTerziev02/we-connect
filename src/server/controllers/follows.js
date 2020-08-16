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

const getFollowing = async (userId) => {
    try {
        const user = await User.findById(userId)
            .select('-password -posts -followers')
            .populate({
                path: 'following',
                select: '-password',
                populate: {
                    path: 'posts',
                    select: '-creator -description -imageUrl -location -createdAt -comments -likes',
                    match: {
                        isDeleted: false
                    }
                }
            }).lean();

        return user.following
    } catch (error) {
        console.error(error)
        return {
            error: errorMessages.invalidUserId
        }
    }
}

module.exports = {
    followUserById,
    getFollowing
}