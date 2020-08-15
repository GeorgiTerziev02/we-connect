import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Posts from '../posts'
import Title from '../title'
import ProfileStats from '../profile-stats'
import ProfileImage from '../profile-image'
import userService from '../../services/user-service'

class Profile extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            userId: null,
            username: null,
            followers: [],
            following: [],
            posts: null
        }
    }

    componentDidMount() {
        this.getUserInfo(this.props.match.params.userId)
    }

    componentDidUpdate() {
        const {
            userId
        } = this.state
        
        if (JSON.stringify(this.props.match.params.userId) !== JSON.stringify(userId)) {
            this.getUserInfo(this.props.match.params.userId)
        }
    }

    getUserInfo = async (userId) => {
        const data = await userService.getById(userId)
        
        if (data.error) {
            return this.props.history.push('/error')
        }

        this.setState({
            userId: data._id,
            username: data.username,
            followers: data.followers ? data.followers : [],
            following: data.following ? data.following : [],
            posts: data.posts
        });
    }

    render() {
        const {
            userId,
            username,
            followers,
            following,
            posts
        } = this.state

        const postsCount = posts ? posts.length : 0

        return (
            <div>
                <Title text={username} />
                <ProfileImage />
                <ProfileStats update={this.getUserInfo} userId={userId} followers={followers} following={following} postsCount={postsCount} />
                <Posts posts={posts} />
            </div>
        )
    }
}

export default withRouter(Profile)
