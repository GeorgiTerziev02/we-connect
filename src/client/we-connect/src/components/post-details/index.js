import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.css'
import getCookie from '../../utils/cookie'
import Post from '../post'
import Spinner from '../spinner'
import Comments from '../comments'

class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null
        }
    }

    // TODO: extract x-auth-token string
    getPost = async (postId) => {
        const promise = await fetch(`http://localhost:4000/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        });

        if (!promise.ok) {
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
                <Comments />
            </div>
        )
    }
}

export default withRouter(PostDetails)