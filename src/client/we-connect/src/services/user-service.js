const userService = {
    // TODO: Code reuse !!!
    login: async (username, password) => {
        const promise = await fetch('http://localhost:4000/api/login', {
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
    },
    register: async (username, password) => {
        const promise = await fetch('http://localhost:4000/api/register', {
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
}

export default userService