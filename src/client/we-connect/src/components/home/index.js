import React, { useContext } from 'react'
import UserContext from '../../Context'
import LoggedInHomePage from '../logged-in-home-page'
import NotLoggedInHomePage from '../not-logged-in-home-page'

const Home = () => {
    const context = useContext(UserContext);

    if (!context.loggedIn) {
        return (
            <NotLoggedInHomePage />
        )
    } else {
        return (
            <LoggedInHomePage />
        )
    }
}

export default Home