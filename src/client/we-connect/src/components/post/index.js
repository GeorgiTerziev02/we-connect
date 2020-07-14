import React from 'react'

const Post = (props) => {
    return (
        <div>
            <img src={props.imageUrl} alt=""/>
            <p>{props.description}</p>
        </div>   
    )
}

export default Post