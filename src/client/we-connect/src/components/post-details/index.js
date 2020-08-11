import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'
import Comments from '../comments'
import AddComment from '../add-comment'
import postService from '../../services/post-service'

class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null
        }
    }

    // TODO: extract x-auth-token string
    getPost = async (postId) => {
        const data = await postService.getById(postId);

        if (data.error) {
            this.props.history.push('/error')
        }

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
                <AddComment postId={post._id} />
                <Comments comments={post.comments} />
            </div>
        )
    }
}

export default withRouter(PostDetails)