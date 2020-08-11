import React, { Component, Fragment } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import UserContext from '../../Context';

class Header extends Component {
    static contextType = UserContext

    logOut = () => {
        this.context.logOut()
    }

    render() {
        const {
            loggedIn,
            user
        } = this.context

        return (
            <Navbar sticky="top" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/"><img src="https://res.cloudinary.com/dlgtvkmfb/image/upload/c_scale,h_36/v1594649995/weconnect_rmfzhf.png" alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">We Connect</Nav.Link>
                    </Nav>
                    <Nav>
                        {loggedIn ?
                            (<Fragment>
                                <Nav.Link as={Link} to="/share-post">Share</Nav.Link>
                                <Nav.Link as={Link} to={`/user/${user.id}`}>Profile</Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={this.logOut}>Logout</Nav.Link>
                            </Fragment>) :
                            (<Fragment>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Fragment>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header