import React from 'react'

const ProfileStats = ({ followers, following, postsCount }) => {
    return (
        <div>
            <div>
                Followers: {followers}
            </div>
            <div>
                Following: {following}
            </div>
            <div>
                Posts: {postsCount}
            </div>
        </div>
    )
}

export default ProfileStats