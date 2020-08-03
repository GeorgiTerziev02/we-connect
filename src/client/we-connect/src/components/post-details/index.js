import React, { Component } from 'react'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'

class PostDetails extends Component{
    constructor(props) {
        super(props)

        this.state = {
            post: null
        }
    }

    getPost = async (postId) => {
        const promise = await fetch(`http://localhost:4000/api/posts/${postId}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY0NDIxMzcsImV4cCI6MTU5NjQ0NTczN30.FzXtfpiPPlCNmqoqpg_jvCZtUNuCoV0KHeVrbTJVF58'
            }
        });

        if(!promise.ok) {
            this.props.history.push('/error')
        }
        
        const data = await promise.json();
        

        this.setState({
            post: data.post
        });
    }

    componentDidMount() {
        this.getPost(this.props.match.params.postId)
    }

    render() {
        if (!this.state.post) {
            return (
                <Spinner />
            )
        }

        const post = this.state.post;

        return (
            <div className={styles["post-details"]}>
                <Post {...post} />
                {/* Comments */}
            </div>
        )
    }
}

export default PostDetails