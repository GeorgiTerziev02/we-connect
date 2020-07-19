import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Navbar sticky="bottom" fixed="bottom" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">
                    We Connect
            </Navbar.Brand>
            </Navbar>
        </footer>
    )
}

export default Footer