import React from 'react'
import styles from './index.module.css'

const ProfileStats = ({ followers, following, postsCount }) => {
    return (
        <div className={styles["stats-container"]}>
            <div className={styles.stat}>
                Followers: {followers + " "}
                <div></div>
            </div>
            <div className={styles.stat}>
                Following: {following}
            </div>
            <div className={styles.stat}>
                Posts: {postsCount}
            </div>
        </div>
    )
}

export default ProfileStats