import getCookie from '../utils/cookie'

const url = 'http://localhost:4000/api/posts/'

const postService = {
    getById: async (postId) => {
        const promise = await fetch(`${url}${postId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        if (!promise.ok) {
            return {
                error: true
            }
        }

        return await promise.json()
    },
    likePost: async (postId) => {
        const promise = await fetch(`${url}like/${postId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        const data = await promise.json();

        return !data.error
    },
    deletePostById: async (postId) => {
        const promise = await fetch(`${url}${postId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })
        
        return promise.status === 204
    },
    getRecent: async () => {
        const promise = await fetch(`${url}recent`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })
        
        if (!promise.ok) {
            return []
        }

        return await promise.json()
    }
}

export default postService
