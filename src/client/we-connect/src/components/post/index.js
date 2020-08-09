import React from 'react'
import styles from './index.module.css'
import Image from '../image'
import { useHistory, useLocation } from 'react-router-dom'

// TODO: Make post responsive for mobile phone
const Post = ({ _id, imageUrl, createdAt, description }) => {
    const history = useHistory()
    const location = useLocation();

    const clickHandler = (e) => {
        if (location.pathname !== `/posts/${_id}`) {
            history.push(`/posts/${_id}`)
        }
    }

    return (
        <div className={styles.card} onClick={clickHandler}>
            <div>
                Uploaded: {createdAt}
            </div>
            <hr />
            <Image imageUrl={imageUrl} />
            <hr />
            <div className={styles.container}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post