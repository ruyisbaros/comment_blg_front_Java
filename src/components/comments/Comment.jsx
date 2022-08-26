import React, { useState } from 'react'
import "./comment.css"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';

const Comment = ({ id, text, userId, username }) => {

    const [isLiked, setIsLiked] = useState(false);

    return (
        <div>

            <div className="comment_container">
                <Link to={`/users/${userId}`} className="to_commenter">
                    <div className="com_avatar">{username.charAt(0).toUpperCase()}</div>
                </Link>
                <div className="com_box">
                    <div className="name_date">
                        <p className="com_name">{username}</p>
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