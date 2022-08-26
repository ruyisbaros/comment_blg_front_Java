import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import "./comment.css"

const CommentForm = ({ postId, userId, getComments }) => {


    const [isComment, setIsComment] = useState(false);
    const [text, setText] = useState("");

    const newComment = {
        userId, postId, text
    }

    const handleNewComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/comments", { ...newComment })
            //console.log(data);
            setText("")
            getComments()
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="comment-form">
            <form onSubmit={handleNewComment}>
                <div className="create_comment">
                    <div className="com_avatar">A</div>
                    <input onClick={() => setIsComment(true)} type="text" placeholder="Add comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                {
                    isComment &&
                    <div className="comment_buttons">
                        <button className="btn btn-cancel" onClick={() => setIsComment(false)}>cancel</button>
                        <button type="submit" className="btn btn-add">add comment</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default CommentForm
