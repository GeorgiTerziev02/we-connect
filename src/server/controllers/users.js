const User = require('../models/user');

const searchUsers = async (params) => {
    const results = await User
        .find({ username: { '$regex': `${params}`, '$options': 'i' } })
        .select('-password')
        .populate({
            path: 'posts',
            select: '-description -imageUrl -location -createdAt -comments -likes',
            match: {
              isDeleted: false
            }
          })
    .lean()
    
    return results
}

module.exports = {
    searchUsers
}