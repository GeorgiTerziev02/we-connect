import React, { Component } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'
import Input from '../input'
import ErrorMessage from '../error-message'
import userService from '../../services/user-service'
import UserContext from '../../Context'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            usernameError: false,
            usernameErrorMessage: '',
            password: '',
            passwordError: false,
            passwordErrorMessage: '',
            rePassword: '',
            rePasswordError: false,
            rePasswordErrorMessage: '',
            submitError: false,
            submitErrorMessage: ''
        }
    }

    static contextType = UserContext

    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleUsernameBlur = () => {
        const { username } = this.state

        if (!username) {
            this.setState({
                usernameError: true,
                usernameErrorMessage: 'Username is required!'
            })
        } else if (username.length < 3 || username.length > 50) {
            this.setState({
                usernameError: true,
                usernameErrorMessage: 'Username must be between 3 and 50 symbols!'
            })
        } else if (!username.match(/^[A-Za-z0-9 ]+$/)) {
            this.setState({
                usernameError: true,
                usernameErrorMessage: 'Username must consist only of letters, digits and spaces'
            })
        } else {
            this.setState({
                usernameError: false,
                usernameErrorMessage: ''
            })
        }
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handlePasswordBlur = () => {
        const { password } = this.state

        if (!password) {
            this.setState({
                passwordError: true,
                passwordErrorMessage: 'Password is required!'
            })
        } else if (password.length < 6 || password.length > 20) {
            this.setState({
                passwordError: true,
                passwordErrorMessage: 'Password must be between 6 and 20 symbols!'
            })
        } else {
            this.setState({
                passwordError: false,
                passwordErrorMessage: ''
            })
        }
    }

    changeRePassword = (event) => {
        this.setState({
            rePassword: event.target.value
        })
    }

    handleRePasswordBlur = () => {
        const { password, rePassword } = this.state

        if (password !== rePassword) {
            this.setState({
                rePasswordError: true,
                rePasswordErrorMessage: 'The two passwords does not match!'
            })
        } else {
            this.setState({
                rePasswordError: false,
                rePasswordErrorMessage: ''
            })
        }
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const {
            username,
            password,
            rePassword,
            usernameError,
            passwordError,
            rePasswordError
        } = this.state

        if (!usernameError && !passwordError && !rePasswordError
            && username && password && rePassword) {
            const data = await userService.register(username, password)

            if (data.token) {
                this.setState({
                    submitError: false
                })
                document.cookie = `x-auth-token=${data.token}`
                this.context.logIn({
                    id: data.userId,
                    username: data.username
                })

                this.props.history.push('/')
            } else {
                this.setState({
                    submitError: true,
                    submitErrorMessage: data.error,
                    password: '',
                    rePassword: ''
                })
            }
        } else {
            if (!username) {
                this.setState({
                    usernameError: true,
                    usernameErrorMessage: 'Username is required!',
                    submitError: false
                })
            }

            if (!password) {
                this.setState({
                    passwordError: true,
                    passwordErrorMessage: 'Password is required!',
                    submitError: false
                })
            }

            if (password !== rePassword) {
                this.setState({
                    rePasswordError: true,
                    rePasswordErrorMessage: 'Re-Password is required!',
                    submitError: false
                })
            }
        }
    }

    render() {
        const {
            username,
            usernameError,
            usernameErrorMessage,
            password,
            passwordError,
            passwordErrorMessage,
            rePassword,
            rePasswordError,
            rePasswordErrorMessage,
            submitError,
            submitErrorMessage
        } = this.state

        return (
            <div className={styles.container}>
                <Title text="Register" />
                <Form className={styles["register-form"]} onSubmit={this.submitHandler}>
                    <ErrorMessage error={submitError} errorMessage={submitErrorMessage}/>
                    <Input
                        id="username"
                        error={usernameError}
                        errorMessage={usernameErrorMessage}
                        onBlur={this.handleUsernameBlur}
                        type="text"
                        label="Username"
                        value={username}
                        placeholder="Enter username"
                        onChange={this.changeUsername}
                    />

                    <Input
                        id="password"
                        error={passwordError}
                        errorMessage={passwordErrorMessage}
                        onBlur={this.handlePasswordBlur}
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Enter password"
                        onChange={this.changePassword}
                    />

                    <Input
                        id="rePassword"
                        error={rePasswordError}
                        errorMessage={rePasswordErrorMessage}
                        onBlur={this.handleRePasswordBlur}
                        type="password"
                        label="Repeat Password"
                        value={rePassword}
                        placeholder="Repeat Password"
                        onChange={this.changeRePassword}
                    />
                    <SubmitButton title="Register" />
                </Form>
            </div>
        )
    }
}

export default Register