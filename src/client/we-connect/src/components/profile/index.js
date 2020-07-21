import React, { Component } from 'react'
import Posts from '../posts';
import Title from '../title'
import ProfileStats from '../profile-stats';
import ProfileImage from '../profile-image';

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
        this.getUserInfo(this.props.match.params.userId);
    }

    getUserInfo = async (userId) => {
        const promise = await fetch(`http://localhost:4000/api/posts/user/${userId}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTUzMjg4NzQsImV4cCI6MTU5NTMzMjQ3NH0.xAS33jxaxk6ASdne2nooCy7HQP4-jkA7noX5ypbpL1E'
            }
        });

        const data = await promise.json();
        console.log(data);

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

export default Profile