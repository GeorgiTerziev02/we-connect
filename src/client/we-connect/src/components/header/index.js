import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar sticky="top" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/"><img src="https://res.cloudinary.com/dlgtvkmfb/image/upload/c_scale,h_36/v1594649995/weconnect_rmfzhf.png" alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">We Connect</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header