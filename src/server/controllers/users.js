const User = require('../models/user');

const searchUsers = async (params) => {
    const results = await User
        .find({ username: { '$regex': `${params}`, '$options': 'i' } })
        .select('-password')
    .lean()
    
    return results
}

module.exports = {
    searchUsers
}