import React, { Component } from 'react'
import styles from './index.module.css'
import Title from '../title'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'

// TODO: extract common css

class SharePost extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Title text="Share Post"/>
                <Form className={styles["share-post"]}>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Sofia, Bulgaria" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className={styles["text-area"]}
                            required
                            name="description"
                            id="description"
                            as="textarea"
                            rows="8"
                            placeholder="Share what you think" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.File
                            className="position-relative"
                            required
                            id="image"
                            name="image"
                        />
                    </Form.Group>
                    <SubmitButton title="Share" />
                </Form>
            </div>
        )
    }
}

export default SharePost