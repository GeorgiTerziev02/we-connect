import React from 'react'
import styles from './index.module.css'
import Image from 'react-bootstrap/Image'
import ErrorImage from '../../images/banner_error_404.jpg'
import LinkButton from '../button/link-button'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <Image src={ErrorImage} fluid />
            <div className={styles.container}>
                <LinkButton to="/" title="Go to posts feed" />
            </div>
        </div>
    )
}

export default NotFound