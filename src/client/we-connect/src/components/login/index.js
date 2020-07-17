import React from 'react'
import styles from './index.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// TODO: make login form responsive
// TODO: method - post
const Login = () => {
    return (
        <Form className={styles["login-form"]}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Button variant="dark" block="true" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login