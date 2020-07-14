import React from 'react'
import styles from './index.module.css'

const Image = ({imageUrl}) => {
    return (
        <img src={imageUrl} className={styles["img-style"]} alt="" style={{
        width: '100%'
        }} />
    )
}

export default Image