import React from 'react'
import LikeButton from '../button/like-button'

const LikePost = ({ likes, onClick }) => {
    return (
        <div>
            <span>Likes: {likes}</span>
            <LikeButton title="Like" onClick={onClick} />
        </div>
        
    )
}

export default LikePost