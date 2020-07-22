import React, { Component } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'
import Input from '../input'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rePassword: ''
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

    changeRePassword = (event) => {
        this.setState({
            rePassword: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        const {
            username,
            password,
            rePassword
        } = this.state
        
        return (
            <div className={styles.container}>
                <Title text="Register" />
                <Form className={styles["register-form"]} onSubmit={this.submitHandler}>
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

                    <Input
                        id="rePassword"
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