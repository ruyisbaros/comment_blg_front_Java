import React, { useState } from 'react'
import "./comment.css"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Comment = ({ id, text }) => {

    const [isLiked, setIsLiked] = useState(false)
    return (
        <div>

            <div className="comment_container">
                <div className="com_avatar">A</div>
                <div className="com_box">
                    <div className="name_date">
                        <p className="com_name">name</p>
                        <p className="com_date">date</p>
                    </div>
                    <div className="com_text">
                        {text}
                    </div>
                    <div className="com_fonts">
                        <div onClick={() => setIsLiked(!isLiked)} className="com_like">
                            {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                        </div>
                        <div className="com_replay">replay</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment