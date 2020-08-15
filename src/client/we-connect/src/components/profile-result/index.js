import React, { Fragment } from 'react'
import styles from './index.module.css'
import ListGroup from 'react-bootstrap/ListGroup'
import { useHistory } from 'react-router-dom'

const ProfileResult = ({ _id, username, followers, following, posts }) => {
    const history = useHistory()

    const clickHandler = () => {
        history.push(`/user/${_id}`)
    }

    return (
        <Fragment>
            <ListGroup.Item onClick={clickHandler} className={styles.pointer}>
                <h5>{username}</h5>
            followers: {followers.length} | following: {following.length} | posts: {posts.length}
            </ListGroup.Item>
            <br />
        </Fragment>
    )
}

export default ProfileResult