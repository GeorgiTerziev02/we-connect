import React, { useContext } from 'react'
import styles from './index.module.css'
import FollowButton from '../button/follow-button'
import UserContext from '../../Context'

const ProfileStats = ({ userId, followers, following, postsCount }) => {
    const context = useContext(UserContext)
    const currentUserId = context.user.id;
    console.log(currentUserId)
    console.log('following', following.length)
    console.log('followers', followers.length)

    const buttonTitle = followers.includes(currentUserId) ? "Unfollow" : "Follow"

    return (
        <div className={styles["stats-container"]}>
            <div className={styles.stat}>
                Followers: {followers.length + " "}
                <div></div>
            </div>
            <div className={styles.stat}>
                Following: {following.length}
            </div>
            <div className={styles.stat}>
                Posts: {postsCount}
            </div>
            {
                JSON.stringify(currentUserId) === JSON.stringify(userId) ?
                    null :
                    <FollowButton title={buttonTitle} />
            }
        </div>
    )
}

export default ProfileStats