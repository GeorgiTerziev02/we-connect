import getCookie from '../utils/cookie'

const url = 'http://localhost:4000/api'

// TODO: Error handling 
const userService = {
    login: async (username, password) => {
        return await auth(username, password, 'login')
    },
    register: async (username, password) => {
        return await auth(username, password, 'register')
    },
    verifyToken: async (token) => {
        const promise = await fetch(`${url}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return await promise.json()
    },
    getById: async (userId) => {
        const promise = await fetch(`${url}/posts/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        const data = await promise.json()

        return data
    },
    findByName: async (searchParams) => {
        const promise = await fetch(`${url}/search/${searchParams}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        const data = await promise.json()

        return data
    },
    following: async () => {
        const promise = await fetch(`${url}/follow/following`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        })

        const data = await promise.json()
        return data
    }
}

const auth = async (username, password, type) => {
    const promise = await fetch(`${url}/${type}`, {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await promise.json()

    return data
}

export default userService