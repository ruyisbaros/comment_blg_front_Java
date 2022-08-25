import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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




const Post = ({ id, text, title, userId, username }) => {

    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const getComments = async () => {
        const { data } = await axios.get(`/api/v1/comments?postId=${id}`);
        console.log(data);
        setCommentList(data);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        getComments();
    };

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
                    <FavoriteIcon onClick={() => setLiked(!liked)} style={{ color: liked ? "red" : 'inherit' }} />
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
                    <CommentForm />
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