import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const LinkButton = ({ to, title }) => {
    return (
        <Link to={to}><Button>{title}</Button></Link>
    )
}

export default LinkButton