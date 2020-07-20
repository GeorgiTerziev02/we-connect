import React from 'react'
import styles from './index.module.css'
import SubmitButton from '../button/submit-button'
import Form from 'react-bootstrap/Form'

// TODO: Harcoded + add upload profile image to server api
const ProfileImage = ({ imageUrl }) => {
    if (!imageUrl) {
        return (
            <div className={styles.container}>
            <Form>
                <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.File
                        className="position-relative"
                        required
                        id="image"
                        name="image"
                    />
                </Form.Group>
                <SubmitButton title="Upload" />
                </Form>
                </div>
        )
    }
    return (
        <img
            className={styles.image}
            src="https://res.cloudinary.com/dlgtvkmfb/image/upload/v1594728298/j6boxrhhcgwpn8r2ou4u.png"
            alt="Avatar"
        />
    )
}

export default ProfileImage