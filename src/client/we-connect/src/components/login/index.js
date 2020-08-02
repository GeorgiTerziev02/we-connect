import React, { Component } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'
import Input from '../input'
import ErrorMessage from '../error-message'
import userService from '../../services/user-service'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            usernameError: false,
            passwordError: false,
            submitError: false,
            submitErrorMessage: '',
            password: ''
        }
    }

    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleUsernameBlur = () => {
        const { username } = this.state;

        if (!username) {
            this.setState({
                usernameError: true
            });
        } else {
            this.setState({
                usernameError: false
            })
        }
    }

    handlePasswordBlur = () => {
        const { password } = this.state

        if (!password) {
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                passwordError: false
            })
        }
    }

    submitHandler = async (event) => {
        event.preventDefault()

        const {
            username,
            password
        } = this.state

        if (username && password) {
            try {
                const data = await userService.login(username, password)
                
                if (data.token) {
                    this.setState({
                        submitError: false
                    })
                    document.cookie = `x-auth-token=${data.token}`
                    this.props.history.push('/')
                } else {
                    this.setState({
                        submitError: true,
                        submitErrorMessage: data.error,
                        password: ''
                    })
                }
            } catch (error) {
                console.log(error);
                this.setState({
                    submitError: true,
                    submitErrorMessage: 'Error occured'
                })
            }
        } else {
            if (!username) {
                this.setState({
                    usernameError: true,
                    submitError: false
                })
            }

            if (!password) {
                this.setState({
                    passwordError: true,
                    submitError: false
                })
            }
        }
    }

    render() {
        const {
            username,
            usernameError,
            passwordError,
            password,
            submitError,
            submitErrorMessage
        } = this.state

        return (
            <div className={styles.container}>
                <Title text="Login" />
                <Form className={styles["login-form"]} onSubmit={this.submitHandler}>
                    <ErrorMessage error={submitError} errorMessage={submitErrorMessage} />
                    <Input
                        id="username"
                        error={usernameError}
                        onBlur={this.handleUsernameBlur}
                        errorMessage="Username is required!"
                        type="text"
                        label="Username"
                        value={username}
                        placeholder="Enter username"
                        onChange={this.changeUsername}
                    />

                    <Input
                        id="password"
                        error={passwordError}
                        errorMessage="Password is required!"
                        onBlur={this.handlePasswordBlur}
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Enter password"
                        onChange={this.changePassword}
                    />
                    <SubmitButton title="Login" />
                </Form>
            </div>
        )
    }
}

export default Login