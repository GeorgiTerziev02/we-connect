import React, { useContext } from 'react'
import styles from './index.module.css'
import SearchBar from '../search-bar'
import UserContext from '../../Context'
import NotLoggedInHomePage from '../not-logged-in-home-page'

const Home = () => {
    const context = useContext(UserContext);

    if (!context.loggedIn) {
        return (
            <NotLoggedInHomePage />
        )
    } else {
        return (
            <div className={styles.body}>
                Hello, {context.user.username}
            </div>
        )
    }
}

export default Home