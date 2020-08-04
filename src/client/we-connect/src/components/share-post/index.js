import React, { Component } from 'react'
import styles from './index.module.css'
import Title from '../title'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Input from '../input'
import TextArea from '../text-area'

// TODO: extract common css

class SharePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            locationError: false,
            locationErrorMessage: '',
            description: '',
            descriptionError: false,
            descriptionErrorMessage: '',
            image: null
        }
    }

    changeLocation = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    handleLocationBlur = () => {
        const { location } = this.state

        if (location && location.length > 100) {
            this.setState({
                locationError: true,
                locationErrorMessage: 'Location must be less than 100 symbols!'
            })
        } else {
            this.setState({
                locationError: false,
                locationErrorMessage: ''
            })
        }
    }

    changeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleDescriptionBlur = () => {
        const { description } = this.state
        
        if (!description) {
            this.setState({
                descriptionError: true,
                descriptionErrorMessage: 'Description is required!'
            })
        } else if (description.length > 2000) {
            this.setState({
                descriptionError: true,
                descriptionErrorMessage: 'Description must be less than 2000 symbols!'
            })
        } else {
            this.setState({
                descriptionError: false,
                descriptionErrorMessage: ''
            })
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        const {
            location,
            locationError,
            locationErrorMessage,
            description,
            descriptionError,
            descriptionErrorMessage
        } = this.state

        return (
            <div className={styles.container}>
                <Title text="Share Post" />
                <Form className={styles["share-post"]} onSubmit={this.submitHandler}>
                    <Input
                        id="location"
                        error={locationError}
                        errorMessage={locationErrorMessage}
                        onBlur={this.handleLocationBlur}
                        type="text"
                        label="Location"
                        value={location}
                        placeholder="Sofia, Bulgaria"
                        onChange={this.changeLocation}
                    />

                    <TextArea
                        label="Description"
                        rows="8"
                        name="description"
                        id="description"
                        value={description}
                        placeholder="Description..."
                        onChange={this.changeDescription}
                        onBlur={this.handleDescriptionBlur}
                        error={descriptionError}
                        errorMessage={descriptionErrorMessage}
                    />

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