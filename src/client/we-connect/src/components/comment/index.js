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
                    At {createdAt} 
                    <strong className={styles.user}>by {creator}</strong>
                </small>
                <hr />
            </Card.Body>
        </Card>
    )
}

export default Comment