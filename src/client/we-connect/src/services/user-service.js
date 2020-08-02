const userService = {
    login: async (username, password) => {
        return await auth(username, password, 'login')
    },
    register: async (username, password) => {
        return await auth(username, password, 'register')
    }
}

const auth = async (username, password, type) => {
    const promise = await fetch(`http://localhost:4000/api/${type}`, {
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