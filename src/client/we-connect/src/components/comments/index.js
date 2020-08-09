import React from 'react'
import styles from './index.module.css'
import Comment from '../comment'
import Spinner from '../spinner'

const Comments = ({ comments }) => {
    return (
        <div className={styles.container}>
            {
                comments ?
                    (comments.length !== 0 ?
                        (comments.map(c => <Comment content={c.content} createdAt={c.createdAt} creator={c.creator} />))
                        : ("No Comments"))
                    : (<Spinner />)
            }
                        {
                comments ?
                    (comments.length !== 0 ?
                        (comments.map(c => <Comment content={c.content} createdAt={c.createdAt} creator={c.creator} />))
                        : ("No Comments"))
                    : (<Spinner />)
            }
        </div>
    )
}

export default Comments