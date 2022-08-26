import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import "./post.css"
import axios from "axios";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    color: !expand ? 'rgba(0,0,0,0.5)' : '#000',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




const Post = ({ id: postId, text, title, userId, username }) => {

    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [likedList, setLikedList] = useState([]);
    const [likerId, setLikerId] = useState(1);//gecici. buraya online user gelecek


    const getLikes = async () => {
        const { data } = await axios.get(`/api/v1/likes?postId=${postId}`)
        //console.log(data);
        setLikedList(data)
    }
    //console.log(likedList);
    useEffect(() => {
        getLikes()

    }, [])

    const checkLiked = () => {
        let include = likedList.find(el => el.userId === likerId)
        if (include) {
            setLiked(true)
        }
    }

    useEffect(() => {
        checkLiked()
    }, [likedList])

    const getComments = async () => {
        const { data } = await axios.get(`/api/v1/comments?postId=${postId}`);
        console.log(data);
        setCommentList(data);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        getComments();
    };


    const handleLike = async () => {
        if (!liked) {
            const { data } = await axios.post("/api/v1/likes", { postId, likerId })
            setLiked(true)
        } else {
            await axios.delete(`/api/v1/likes?userId=${likerId}&postId=${postId}`);
            setLiked(false)
        }

        getLikes();

    }

    return (
        <Card className="post" >
            <CardHeader
                avatar={
                    <Avatar className="avatar--1" aria-label="recipe">
                        <Link to={`/users/${userId}`}>
                            {username.charAt(0).toUpperCase()}
                        </Link>
                    </Avatar>
                }

                title={title}
            /* subheader="September 14, 2016" */
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={handleLike} style={{ color: liked ? "red" : 'inherit' }} />
                    <span style={{ fontSize: "16px", marginLeft: "20px" }}>{likedList.length > 0 ? likedList.length : ""}</span>
                </IconButton>
                <IconButton aria-label="share">
                    {/*  <ShareIcon /> */}
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{commentList.length} Comments</Typography>
                    <CommentForm postId={postId} userId="2" getComments={getComments} />
                    <Typography paragraph>
                        {
                            commentList.length === 0 ? <h3>This Post has no Comment yet!</h3> :
                                commentList.map(item => (
                                    <Comment key={item.id} {...item} />
                                ))}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Post