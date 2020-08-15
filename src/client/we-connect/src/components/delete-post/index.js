import React from 'react'
import DeleteButton from '../button/delete-button'

const DeletePost = ({ onClickHandler }) => {
    return (
        <div>
            <br />
            <DeleteButton title="Delete post" onClick={onClickHandler} />
        </div>
    )
}

export default DeletePost