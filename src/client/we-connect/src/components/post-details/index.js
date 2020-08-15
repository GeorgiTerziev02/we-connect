import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'
import Comments from '../comments'
import AddComment from '../add-comment'
import postService from '../../services/post-service'
import LikePost from '../like-post'

class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null
        }
    }

    getPost = async (postId) => {
        const data = await postService.getById(postId);

        if (data.error) {
            this.props.history.push('/error')
        }

        this.setState({
            post: data.post
        });
    }

    likeHandler = async (e) => {
        e.preventDefault()
        const postId = this.state.post._id
        console.log('3131', postId)
        const data = await postService.likePost(postId)
        console.log(data);

        if (!data.error) {
            this.getPost(postId)
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.postId)
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
                <LikePost likes={post.likes.length} onClick={this.likeHandler} />
                <AddComment postId={post._id} />
                <Comments comments={post.comments} />
            </div>
        )
    }
}

export default withRouter(PostDetails)