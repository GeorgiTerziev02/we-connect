import React from 'react'
import Form from 'react-bootstrap/Form'
import ErrorMessage from '../error-message'

const Input = ({ id, error, errorMessage, onBlur, type, label, value, placeholder, onChange }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Control
                id={id}
                type={type}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete="on"
            />
            <ErrorMessage error={error} errorMessage={errorMessage} />
        </Form.Group>
    )
}

export default Input