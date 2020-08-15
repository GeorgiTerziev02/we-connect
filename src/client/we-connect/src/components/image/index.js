import React from 'react'
import styles from './index.module.css'

const Image = ({imageUrl, onClick}) => {
    return (
        <img src={imageUrl} className={styles["img-style"]} onClick={onClick} alt="" style={{
        width: '100%'
        }} />
    )
}

export default Image