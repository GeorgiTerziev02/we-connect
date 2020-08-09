import React from 'react'
import Comment from '../comment'
import Spinner from '../spinner'

const Comments = ({ comments }) => {
    return (
        <div>
            {
                comments ? 
                (comments.length !== 0 ? (comments.map(c => <Comment content={c.content} createdAt={c.createdAt} creator={c.creator} />)) : ("No Comments")) : (<Spinner />)}
        </div>
    )
}

export default Comments