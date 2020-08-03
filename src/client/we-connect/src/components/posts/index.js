import React, { Component } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'
import UserContext from '../../Context'

class Posts extends Component{
    constructor(props) {
        super(props)
    }

    static contextType = UserContext

    render() {
        const { posts } = this.props
        console.log(this.context)
        return (
            <div className={styles["posts-container"]}>
                {posts ?
                    (posts.length !== 0 ? (posts.map(p => <Post key={p._id} {...p} />)) : ("No Posts"))
                    : (<Spinner />)}
            </div>
        )
    }
}

export default Posts