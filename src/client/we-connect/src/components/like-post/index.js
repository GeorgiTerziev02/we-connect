import React from 'react'
import styles from './index.module.css'
import LikeButton from '../button/like-button'

const LikePost = ({ _id, likes, onClick }) => {
    return (
        <div className={styles.likes}>
            <span>Likes: {likes}</span>
            <LikeButton title="Like" onClick={onClick} />
        </div>
        
    )
}

export default LikePost