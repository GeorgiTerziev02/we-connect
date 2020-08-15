import React from 'react'
import Button from 'react-bootstrap/Button'

const DeleteButton = ({ title, onClick }) => {
    return (
        <Button variant="danger" onClick={onClick}>
            {title}
        </Button>
    )
}

export default DeleteButton