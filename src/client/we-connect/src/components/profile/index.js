import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Posts from '../posts'
import Title from '../title'
import ProfileStats from '../profile-stats'
import ProfileImage from '../profile-image'
import getCookie from '../../utils/cookie'

class Profile extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            username: null,
            followers: null,
            following: null,
            posts: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.userId);
        this.getUserInfo(this.props.match.params.userId);
    }

    getUserInfo = async (userId) => {
        const promise = await fetch(`http://localhost:4000/api/posts/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("x-auth-token")}`
            }
        });

        const data = await promise.json();
        

        this.setState({
            username: data.username,
            followers: data.followers ? data.followers.length : 0,
            following: data.following ? data.following.length : 0,
            posts: data.posts
        });
    }

    render() {
        const {
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
                <ProfileStats followers={followers} following={following} postsCount={postsCount} />
                <Posts posts={posts} />
            </div>
        )
    }
}

export default withRouter(Profile)
