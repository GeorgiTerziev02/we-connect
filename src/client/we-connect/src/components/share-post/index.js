import React, { Component } from 'react'
import axios from 'axios'
import styles from './index.module.css'
import Title from '../title'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../button/submit-button'
import Input from '../input'
import TextArea from '../text-area'
import ErrorMessage from '../error-message'

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
            image: null,
            imageError: false,
            imageErrorMessage: ''
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

    changeImage = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    submitHandler = async (event) => {
        event.preventDefault();
        
        const {
            location,
            description,
            image,
            imageError,
            descriptionError,
            locationError
        } = this.state;

        console.log(image);

        if (location && location.length > 100) {
            this.setState({
                locationError: true,
                locationErrorMessage: 'Location must be less than 100 symbols!'
            })
        }

        // TODO: Not sure if this is correct
        this.handleDescriptionBlur();

        if (image === null) {
            this.setState({
                imageError: true,
                imageErrorMessage: 'Image is required!'
            })
        } else {
            this.setState({
                imageError: false,
                imageErrorMessage: ''
            })
        }

        if (!imageError && !descriptionError && !locationError && image && description) {
            const data = new FormData()
            data.append('image', image)
            data.append('description', description)

            location && data.append('location', location)

            axios.post('http://localhost:4000/api/posts', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWZlMDQ1NjMzYzE4NzFiYTA4NGQzYjIiLCJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY1NDQyMTksImV4cCI6MTU5NjU0NzgxOX0.CQlvZpGIQLAovJepC65wH1HICC2NbMagnmmizWFj5us'
                }
            }).then(response => {
                console.log(response);
                this.props.history.push(`/posts/${response.data.postId}`);
            })
                .catch(console.log);
        }
    }

    render() {
        const {
            location,
            locationError,
            locationErrorMessage,
            description,
            descriptionError,
            descriptionErrorMessage,
            imageError,
            imageErrorMessage
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
                            onChange={this.changeImage}
                        />
                        <ErrorMessage error={imageError} errorMessage={imageErrorMessage} />
                    </Form.Group>
                    <SubmitButton title="Share" />
                </Form>
            </div>
        )
    }
}

export default SharePost