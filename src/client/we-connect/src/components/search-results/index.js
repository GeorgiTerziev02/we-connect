import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import { useParams } from 'react-router-dom'
import userService from '../../services/user-service'
import ListGroup from 'react-bootstrap/ListGroup'
import Title from '../title'
import ProfileResult from '../profile-result'

const SearchResults = () => {
    const [users, setUsers] = useState([])
    const { params } = useParams();

    const findUsers = async () => {
        const result = await userService.findByName(params)
        setUsers(result)
    }

    useEffect(() => {
        findUsers()
    }, [params]);

    return (
        <div className={styles.container}>
            <Title text="Search results" />
            <ListGroup>
                {
                    users.length === 0 ? (<div>No Results for {params}</div>) :
                    (users.map(u => <ProfileResult key={u._id} {...u}/>))
                }
            </ListGroup>
        </div>
    )
}

export default SearchResults