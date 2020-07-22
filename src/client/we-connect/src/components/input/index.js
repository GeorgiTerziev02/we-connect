import React from 'react'
import Form from 'react-bootstrap/Form'

const Input = ({ id, type, label, value, placeholder, onChange }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <Form.Control id={id} type={type} value={value} placeholder={placeholder} onChange={onChange} />
        </Form.Group>
    )
}

export default Input