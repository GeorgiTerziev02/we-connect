import React from 'react'
import './index.module.css'
import LinkButton from '../button/link-button'

const NotLoggedInHomePage = () => {
    return (
        <h3>
            <span>Sign up</span>
            <span>and</span>
            <span>Start exploring</span>
            <p><LinkButton title="Register" to="/register" />   <LinkButton title="Login" to="/login" /></p>
        </h3>
    )
}

export default NotLoggedInHomePage