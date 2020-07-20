import React, { Component } from 'react'
import Posts from '../posts';
import Title from '../title'

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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTUyNTIxMTQsImV4cCI6MTU5NTI1NTcxNH0.tQB4_RmwU_rN7XkFTosldXqtxXkExNjLiwTgGid6KhA'
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
                <div>
                    Followers: {followers}
                </div>
                <div>
                    Following: {following}
                </div>
                <div>
                    Posts: {postsCount}
                </div>
                <Posts posts={posts} />
            </div>
        )
    }
}

export default Profile