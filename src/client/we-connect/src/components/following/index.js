import React, { useState } from 'react'
import userService from '../../services/user-service'
import ProfileResult from '../profile-result'
import { useEffect } from 'react'

const Following = () => {
    const [following, setFollowing] = useState([])

    const getFollowing = async () => {
        const data = await userService.following()
        setFollowing(data)
    }

    useEffect(() => {
        getFollowing()
    }, [])

    return (
        <div>
            {
                following.length === 0 ?
                    (<p>Follows somebody...</p>)
                    : (following.map(u => <ProfileResult key={u._id} {...u}/>))
            }
        </div>
    )
}

export default Following