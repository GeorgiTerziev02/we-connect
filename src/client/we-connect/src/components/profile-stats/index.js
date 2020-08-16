import React, { useContext } from 'react'
import styles from './index.module.css'
import FollowButton from '../button/follow-button'
import UserContext from '../../Context'
import followService from '../../services/follow-service'
import { useHistory } from 'react-router-dom'

const ProfileStats = ({ update, userId, followers, following, postsCount }) => {
    const context = useContext(UserContext)
    const history = useHistory()
    const currentUserId = context.user.id;

    const buttonTitle = followers.includes(currentUserId) ? "Unfollow" : "Follow"

    const clickHandler = async (e) => {
        e.preventDefault()

        const result = await followService.followUserById(userId);

        if (result) {
            update(userId);
        }
    }

    const followingHandler = () => {
        if (currentUserId === userId) {
            history.push('/following')
        }
    }

    return (
        <div className={styles["stats-container"]}>
            <div className={styles.stat}>
                Followers: {followers.length + " "}
                <div></div>
            </div>
            <div className={styles["following-stat"]} onClick={followingHandler}>
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