import React from 'react'
import styles from './index.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// TODO: fix register and login form css is the same
const Register = () => {
    return (
        <Form className={styles["register-form"]}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
            
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" name="rePassword" placeholder="Repeat Password" />
        </Form.Group>
        <Button variant="primary" block="true" type="submit">
            Register
        </Button>
    </Form>
    )
}

export default Register