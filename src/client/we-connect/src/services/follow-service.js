import getCookie from '../utils/cookie'

const url = 'http://localhost:4000/api/follow/'

const followService = {
    followUserById: async (userToFollowId) => {
        const promise = await fetch(`${url}${userToFollowId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })
        
        return promise.status === 201
    }
}

export default followService
