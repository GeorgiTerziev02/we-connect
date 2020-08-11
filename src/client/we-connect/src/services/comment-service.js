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

        const data = await promise.json()

        return data
     }
}

export default commentService