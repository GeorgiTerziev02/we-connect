import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dlgtvkmfb/image/upload/c_scale,h_36/v1594649995/weconnect_rmfzhf.png" alt=""/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#acc">We Connect</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#register">Register</Nav.Link>
                    <Nav.Link eventKey={2} href="#login">
                        Login
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header