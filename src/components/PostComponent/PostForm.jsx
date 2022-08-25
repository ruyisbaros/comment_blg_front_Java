import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput'
import { Link } from "react-router-dom";
import { Button, CardContent, InputAdornment } from "@mui/material";
import "./post.css"
import axios from "axios";
import { toast } from "react-toastify"


const PostForm = ({ username, getPosts }) => {

    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [userId, setUserId] = useState(3)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/posts", { text, title, userId })
            console.log(data);
            setText("")
            setTitle("")
            toast.success("Post has been created successfully")
            getPosts();
        } catch (error) {
            toast.error("Something went wrong!!!")
        }
    }

    return (
        <Card className="post" >
            <CardHeader
                avatar={
                    <Avatar className="avatar--2" aria-label="recipe">
                        <Link to={`/users/1`}>
                            {username.charAt(0).toUpperCase()}
                        </Link>
                    </Avatar>
                }

                title={<OutlinedInput
                    id="outlined-adorment-amount"
                    multiline
                    placeholder="Title"
                    inputProps={{ maxLength: 30 }}
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >

                </OutlinedInput>}
            /* subheader="September 14, 2016" */
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <OutlinedInput
                        id="outlined-adorment-amount"
                        multiline
                        placeholder="Text..."
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    >

                    </OutlinedInput>
                </Typography>
            </CardContent>

            <div className="btn_box">
                <button onClick={handleSubmit} type="submit" className="btn_post">Post</button>
            </div>
        </Card>
    )
}

export default PostForm
