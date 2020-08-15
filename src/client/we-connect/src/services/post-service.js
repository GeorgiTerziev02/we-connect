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

        const data = await promise.json()

        return data
    },
    likePost: async (postId) => {
        const promise = await fetch(`${url}like/${postId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        const data = await promise.json();

        if (data.error) {
            return false
        } else {
            return true
        }
    },
    deletePostById: async (postId) => {
        const promise = await fetch(`${url}${postId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        if (promise.status === 204) {
            return true
        } else {
            return false
        }
    }
}

export default postService