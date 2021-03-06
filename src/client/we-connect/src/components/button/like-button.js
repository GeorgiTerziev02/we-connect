import React from 'react'
import Button from 'react-bootstrap/Button'

const LikeButton = ({ title, onClick }) => {
    return (
        <Button variant="outline-primary" onClick={onClick}>
            {title}
        </Button>
    )
}

export default LikeButton