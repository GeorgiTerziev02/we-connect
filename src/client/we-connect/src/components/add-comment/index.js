import React, { useState } from 'react'
import styles from './index.module.css'
import SubmitButton from '../button/submit-button'
import TextArea from '../text-area'
import commentService from '../../services/comment-service'
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../error-message'

const AddComment = ({ postId }) => {
    const [content, setContent] = useState('')
    const [contentError, setContentError] = useState(false)
    const [contentErrorMessage, setContentErrorMessage] = useState('')
    const [submitError, setSubmitError] = useState(false)
    const [submitErrorMessage, setSubmitErrorMessage] = useState('')

    const history = useHistory()

    const handleContentBlur = () => {
        if (!content) {
            setContentError(true)
            setContentErrorMessage('Comment content is required!')
        } else if(content.length > 100){
            setContentError(true)
            setContentErrorMessage('Comment length must be less than 100 symbols!')
        } else {
            setContentError(false)
            setContentErrorMessage('')
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        handleContentBlur()

        if (!contentError) {
            const data = await commentService.create(postId, content)

            if (data.error) {
                setSubmitError(true)
                setSubmitErrorMessage(data.error)
            } else {
                history.push(`/posts/${postId}`)
            }
        }
    }

    return (
        <form className={styles["input-form"]} onSubmit={submitHandler}>
            <ErrorMessage error={submitError} errorMessage={submitErrorMessage} />
            <TextArea
                id="content"
                name="content"
                value={content}
                error={contentError}
                errorMessage={contentErrorMessage}
                onBlur={handleContentBlur}
                onChange={e=>setContent(e.target.value)}
                rows={2}
                label="Say what you think"
                placeholder="Enter comment"
            />
            <SubmitButton title="Add comment" />
        </form>
    )
} 

export default AddComment