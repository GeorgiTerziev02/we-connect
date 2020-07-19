import React, { Fragment } from 'react'
import styles from '../shared/styles/login-register.module.css'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Title from '../title'

const Register = () => {
    return (
        <Fragment>
            <Title text="Register" />
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
                <SubmitButton title="Register" />
            </Form>
        </Fragment>
    )
}

export default Register