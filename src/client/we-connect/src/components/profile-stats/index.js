import React, { useContext } from 'react'
import styles from './index.module.css'
import FollowButton from '../button/follow-button'
import UserContext from '../../Context'
import followService from '../../services/follow-service'

const ProfileStats = ({ update, userId, followers, following, postsCount }) => {
    const context = useContext(UserContext)
    const currentUserId = context.user.id;
    console.log(currentUserId)
    console.log('following', following.length)
    console.log('followers', followers.length)

    const buttonTitle = followers.includes(currentUserId) ? "Unfollow" : "Follow"

    const clickHandler = async (e) => {
        e.preventDefault()

        const result = await followService.followUserById(userId);

        if (result) {
            update(userId);
        }
    }

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
                    <FollowButton title={buttonTitle} onClick={clickHandler}/>
            }
        </div>
    )
}

export default ProfileStats