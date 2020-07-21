import React from 'react'
import styles from './index.module.css'
import Image from '../image'

// TODO: Make post responsive for mobile phone
const Post = ({ imageUrl, createdAt, description }) => {
    return (
        <div className={styles.card}>
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