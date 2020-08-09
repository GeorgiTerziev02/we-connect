import React, { useState, useContext } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'
import Input from '../input'
import ErrorMessage from '../error-message'
import userService from '../../services/user-service'
import UserContext from '../../Context'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [submitError, setSumbitError] = useState(false)
    const [submitErrorMessage, setSubmitErrorMessage] = useState('')

    const context = useContext(UserContext)
    const history = useHistory()

    const handleUsernameBlur = () => {
        if (!username) {
            setUsernameError(true)
        } else {
            setUsernameError(false)
        }
    }

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        if (username && password) {
            try {
                const data = await userService.login(username, password)

                if (data.token) {
                    setSumbitError(false)
                    document.cookie = `x-auth-token=${data.token}`
                    context.logIn({
                        id: data.userId,
                        username: data.username
                    })

                    history.push('/')
                } else {
                    setSumbitError(true)
                    setSubmitErrorMessage(data.error)
                    setPassword('')
                }
            } catch (err) {
                console.error(err);
                setSumbitError(true)
                setSubmitErrorMessage('Error occured!')
            }
        } else {
            if (!username) {
                setUsernameError(true)
                setSumbitError(false)
            }

            if (!password) {
                setPasswordError(true)
                setSumbitError(false)
            }
        }
    }

    return (
        <div className={styles.container}>
            <Title text="Login" />
            <Form className={styles["login-form"]} onSubmit={submitHandler}>
                <ErrorMessage error={submitError} errorMessage={submitErrorMessage} />
                <Input
                    id="username"
                    error={usernameError}
                    onBlur={handleUsernameBlur}
                    errorMessage="Username is required!"
                    type="text"
                    label="Username"
                    value={username}
                    placeholder="Enter username"
                    onChange={e => setUsername(e.target.value)}
                />

                <Input
                    id="password"
                    error={passwordError}
                    errorMessage="Password is required!"
                    onBlur={handlePasswordBlur}
                    type="password"
                    label="Password"
                    value={password}
                    placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                />
                <SubmitButton title="Login" />
            </Form>
        </div>)
}

export default Login