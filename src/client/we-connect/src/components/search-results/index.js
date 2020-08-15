import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../../services/user-service';

const SearchResults = () => {
    const [users, setUsers] = useState(null)
    const { params } = useParams();

    const findUsers = async () => {
        const result = await userService.findByName(params)
        setUsers(result)
        console.log(result)
    }

    useEffect(() => {
        findUsers()
    }, [params]);

    return (
        <div>
            searched for {params}
        </div>
    )
}

export default SearchResults