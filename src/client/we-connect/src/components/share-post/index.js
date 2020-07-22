import React, { Component } from 'react'
import styles from './index.module.css'
import Title from '../title'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Input from '../input'

// TODO: extract common css

class SharePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            description: '',
            image: null
        }
    }

    changeLocation = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        const {
            location,
            description
        } = this.state

        return (
            <div className={styles.container}>
                <Title text="Share Post" />
                <Form className={styles["share-post"]} onSubmit={this.submitHandler}>
                    <Input
                        id="location"
                        type="text"
                        label="Location"
                        value={location}
                        placeholder="Sofia, Bulgaria"
                        onChange={this.changeLocation}
                    />

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className={styles["text-area"]}
                            // required
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
                            // required
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