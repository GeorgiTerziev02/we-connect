const url = 'http://localhost:4000/api'

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
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await promise.json()
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