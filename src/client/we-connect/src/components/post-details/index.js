import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.css'
import Post from '../post'
import Spinner from '../spinner'
import Comments from '../comments'
import AddComment from '../add-comment'
import postService from '../../services/post-service'
import LikePost from '../like-post'
import UserContext from '../../Context'
import DeletePost from '../delete-post'

class PostDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null,
            userId: null
        }
    }

    static contextType = UserContext

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
        this.getPost(this.props.match.params.postId)
        this.setState({
            userId: this.context.user.id
        })
    }

    render() {
        if (!this.state.post) {
            return (
                <Spinner />
            )
        }

        const {
            post,
            userId
        } = this.state
        console.log(this.context);

        return (
            <div className={styles["post-details"]}>
                <Post {...post} />
                <div className={styles.container}>
                    <LikePost likes={post.likes.length} onClick={this.likeHandler} />
                    {JSON.stringify(post.creator) === JSON.stringify(userId) ? <DeletePost /> : null}
                </div>
                <AddComment postId={post._id} />
                <Comments comments={post.comments} />
            </div>
        )
    }
}

export default withRouter(PostDetails)