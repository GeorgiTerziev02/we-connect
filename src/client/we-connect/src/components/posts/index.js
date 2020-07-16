import React, { Component } from 'react'
import Post from '../post'

class Posts extends Component{
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }

    getPosts = async () => {
        const promise = await fetch('http://localhost:4000/api/posts/user/5efe045633c1871ba084d3b2', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTQ4ODk5NDUsImV4cCI6MTU5NDg5MzU0NX0.PPDAqDmLq-GIdVLKz7ttm-UAGTD2QYxyXh7P3ooPuFw'
            }
        });
        const data = await promise.json();
        const posts = data.posts;
        this.setState({posts})
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        const { posts } = this.state
        return (
        <div>
            {posts ? posts.map(p => <Post key={p._id} {...p} />) : 'Loading'    }
        </div>
        );
    }
}

export default Posts