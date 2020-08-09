import React from 'react'
import styles from './index.module.css'
import Card from 'react-bootstrap/Card'

const Comment = ({ content, createdAt, creator }) => {
    return (
        <Card>
            <Card.Body>
                {content}
                    <br />
                <small>
                    {createdAt}
                    <strong className={styles.user}>{creator}</strong>
                </small>
                <hr />
            </Card.Body>
        </Card>
    )
}

export default Comment