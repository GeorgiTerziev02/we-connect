import React from 'react'
import styles from './index.module.css'
import Image from '../image'
import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment'

const Post = ({ _id, imageUrl, likes, createdAt, description }) => {
    const history = useHistory()
    const location = useLocation();

    const clickHandler = (e) => {
        if (location.pathname !== `/posts/${_id}`) {
            history.push(`/posts/${_id}`)
        }
    }

    return (
        <div className={styles.card}>
            <div>
                Uploaded: <Moment format="HH:mm DD/MM/YY">{createdAt}</Moment>
            </div>
            <hr />
            <Image imageUrl={imageUrl} onClick={clickHandler} />
            <hr />
            <div className={styles.container}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post