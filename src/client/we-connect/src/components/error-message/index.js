import React from 'react'
import styles from './index.module.css'
import Alert from 'react-bootstrap/Alert'

const ErrorMessage = ({ error, errorMessage }) => {
    return (
        error ?
            (<Alert variant='danger' className={styles.error}>
                {errorMessage}
            </Alert >) : (null)
    )
}

export default ErrorMessage