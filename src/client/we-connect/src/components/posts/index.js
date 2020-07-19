import React, { Component } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: null
        }
    }

    getPosts = async () => {
        const promise = await fetch('http://localhost:4000/api/posts/user/5efe045633c1871ba084d3b2', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTUxNTcyOTIsImV4cCI6MTU5NTE2MDg5Mn0.wsKFPQJoy4-vBNDeqFOfsE4agrV-IupqroSYi4qxPnk'
            }
        });
        const data = await promise.json();
        const posts = data.posts;
        this.setState({ posts })
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        const { posts } = this.state
        
        return (
            <div className={styles["posts-container"]}>
                {posts ? (posts.map(p => <Post key={p._id} {...p} />)) : (<Spinner />)}
            </div>
        );
    }
}

export default Posts