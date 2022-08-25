import React, { useRef, useState, useEffect } from 'react'
import "./comment.css"

const CommentForm = () => {

    const comment = useRef();
    const [isComment, setIsComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    /* React.useEffect(() => {
        if (inputVisible) {
          inputElement.current.focus();
        }
      }, [inputVisible]); */
    /* if (comment.current.focus()) {
        setIsComment(true)
    } */

    return (
        <div className="comment-form">
            <div className="create_comment">
                <div className="com_avatar">A</div>
                <input onClick={() => setIsComment(true)} type="text" placeholder="Add comment..."

                />
            </div>
            {
                isComment &&
                <div className="comment_buttons">
                    <button className="btn btn-cancel" onClick={() => setIsComment(false)}>cancel</button>
                    <button className="btn btn-replay">add comment</button>
                </div>
            }
        </div>
    )
}

export default CommentForm
