import React from 'react'
import Button from 'react-bootstrap/Button'

const FollowButton = ({ title, onClick }) => {
    return (
        <Button variant="outline-info" onClick={onClick}>
            {title}
        </Button>
    )
}

export default FollowButton