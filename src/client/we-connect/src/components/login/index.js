import React from 'react'
import styles from './index.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// TODO: make login form responsive
// TODO: method - post
const Login = () => {
    return (
        <Form className={styles.form}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className={styles.input} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className={styles.input} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login