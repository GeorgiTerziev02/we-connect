import React from 'react'
import Card from 'react-bootstrap/Card'

const Comment = ({ content, createdAt, creator }) => {
    return (
        <Card>
            <Card.Body>
                {content}
                    <br />
                <small>
                    {createdAt}
                </small>
                    <strong>{creator}</strong>
                <hr />
            </Card.Body>
        </Card>
    )
}

export default Comment