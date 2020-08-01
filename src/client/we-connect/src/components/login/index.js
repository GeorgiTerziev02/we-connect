import React, { Component } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'
import Input from '../input'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
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

    submitHandler = async (event) => {
        event.preventDefault()

        const {
            username,
            password
        } = this.state

        try {
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

            const data = await promise.json();
            
            if(data.token){
                document.cookie = `x-auth-token=${data.token}`
                this.props.history.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            username,
            password
        } = this.state

        return (
            <div className={styles.container}>
                <Title text="Login" />
                <Form className={styles["login-form"]} onSubmit={this.submitHandler}>
                    <Input
                        id="username"
                        type="text"
                        label="Username"
                        value={username}
                        placeholder="Enter username"
                        onChange={this.changeUsername}
                    />

                    <Input
                        id="password"
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