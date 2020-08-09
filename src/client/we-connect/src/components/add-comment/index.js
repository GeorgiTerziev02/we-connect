import React, { useState } from 'react'
import styles from './index.module.css'
import SubmitButton from '../button/submit-button'
import TextArea from '../text-area'

const AddComment = ({ postId }) => {
    const [content, setContent] = useState('')
    const [contentError, setContentError] = useState(false)
    const [contentErrorMessage, setContentErrorMessage] = useState('')

    const handleContentBlur = () => {
        
    }

    return (
        <form className={styles["input-form"]}>
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