import React from 'react'
import Button from 'react-bootstrap/Button'

const SubmitButton = ({ title }) => {
    return (
        <Button variant="dark" block="true" type="submit">
            {title}
        </Button>
    )
}

export default SubmitButton