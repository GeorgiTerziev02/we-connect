import React from 'react'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'

const Posts = ({ posts }) => {
    return (
        <div className={styles["posts-container"]}>
            {posts ?
                (posts.length !== 0 ? (posts.map(p => <Post key={p._id} {...p} />)) : ("No Posts"))
                : (<Spinner />)}
        </div>
    )
}

export default Posts