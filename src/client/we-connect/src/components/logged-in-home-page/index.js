import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import postService from '../../services/post-service'
import Posts from '../posts'
import Title from '../title'

const LoggedInHomePage = () => {
    const [posts, setPosts] = useState([])
    const context = useContext(UserContext)

    const getRecentPosts = async () => {
        const data = await postService.getRecent()
        console.log(data)

        setPosts(data)
    }

    useEffect(() => {
        getRecentPosts()
    }, [])

    return (
        <div className={styles.body}>
            <Title text={`Hello, ${context.user.username}! See Your followings recent posts:`} />
            <small>Follow more people for more amazing content</small>
            <Posts posts={posts} />
        </div>
    )
}

export default LoggedInHomePage