import getCookie from '../utils/cookie'

const url = 'http://localhost:4000/api/comments'

const commentService = {
    create: async (postId, content) => {
        const promise = await fetch(`${url}/${postId}`, {
            method: 'POST',
            body: JSON.stringify({
                'content': content
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        return await promise.json()
     }
}

export default commentService
