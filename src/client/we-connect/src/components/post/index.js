import React from 'react'
import styles from './index.module.css'

const Post = (props) => {
    return (
        <div class={styles.card}>
            <img src={props.imageUrl} className={styles["img-style"]} alt="Avatar" style={{
                width: '100%'
            }} />
            <hr/>
            <div class={props.container}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Post