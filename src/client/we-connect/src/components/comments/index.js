import React from 'react'
import styles from './index.module.css'
import Comment from '../comment'
import Spinner from '../spinner'

const Comments = ({ comments }) => {
    return (
        <div className={styles.container}>
            <h4>Comments</h4>
            {
                comments ?
                    (comments.length !== 0 ?
                        (comments.map(c => <Comment key={c._id} content={c.content} createdAt={c.createdAt} creatorId={c.creator._id} creatorName={c.creator.username} />))
                        : ("No Comments"))
                    : (<Spinner />)
            }
        </div>
    )
}

export default Comments