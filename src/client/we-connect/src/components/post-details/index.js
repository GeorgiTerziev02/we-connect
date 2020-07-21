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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTUzMjg4NzQsImV4cCI6MTU5NTMzMjQ3NH0.xAS33jxaxk6ASdne2nooCy7HQP4-jkA7noX5ypbpL1E'
            }
        });

        if(!promise.ok) {
            this.props.history.push('/error')
        }
        
        const data = await promise.json();
        console.log(data);

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