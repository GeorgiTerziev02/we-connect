import React from 'react'
import styles from './index.module.css'
import Image from '../image'

const Post = (props) => {
    return (
        <div className={styles.card}>
            <Image imageUrl={props.imageUrl}/>
            <hr/>
            <div className={props.container}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Post