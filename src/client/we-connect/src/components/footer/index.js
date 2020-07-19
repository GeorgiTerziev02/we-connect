import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
    return (
        <footer>
            <Navbar fixed="bottom" sticky="bottom" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">
                    We Connect
            </Navbar.Brand>
            </Navbar>
        </footer>
    )
}

export default Footer