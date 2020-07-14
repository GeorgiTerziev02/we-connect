import React from 'react'
import styles from './index.module.css'
import Image from '../image'

const Post = (props) => {
    return (
        <div class={styles.card}>
            <Image imageUrl={props.imageUrl}/>
            <hr/>
            <div class={props.container}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Post