import React from 'react'
import styles from './index.module.css'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'

const Comment = ({ creatorId, content, createdAt, creatorName }) => {
    const history = useHistory()

    const useClickHandler = (e) => {
        history.push(`/user/${creatorId}`)
    }

    return (
        <Card>
            <Card.Body>
                {content}
                <br />
                <small>
                    At <Moment format="HH:mm DD/MM/YY">{createdAt}</Moment>
                    <strong className={styles.user} onClick={useClickHandler}>by {creatorName}</strong>
                </small>
                <hr />
            </Card.Body>
        </Card>
    )
}

export default Comment