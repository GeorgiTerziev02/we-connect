import getCookie from '../utils/cookie'

const postService = {
    getById: async (postId) => {
        const promise = await fetch(`http://localhost:4000/api/posts/${postId}`, {
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
     }
}

export default postService