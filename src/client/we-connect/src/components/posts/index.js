import React, { Component } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    getPosts = async () => {
        const promise = await fetch('http://localhost:4000/api/posts/user/5efe045633c1871ba084d3b2', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTUwNzQyMTIsImV4cCI6MTU5NTA3NzgxMn0.e1jksL7F9Lufa0bTfP7pLBP5C0NHPkEoJuhE8ePzGtU'
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