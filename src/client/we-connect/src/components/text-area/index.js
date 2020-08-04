import React from 'react'
import styles from './index.module.css'
import Form from 'react-bootstrap/Form'
import ErrorMessage from '../error-message' 

const TextArea = ({ label, name, id, value, rows, placeholder, onChange, onBlur, error, errorMessage }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                className={styles["text-area"]}
                // required
                name={name}
                id={id}
                value={value}
                as="textarea"
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />
            <ErrorMessage error={error} errorMessage={errorMessage} />
        </Form.Group>
    )
}

export default TextArea