import React, { useState, useEffect } from 'react'
import Post from '../../components/PostComponent/Post'
import "./home.css"
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostForm from '../../components/PostComponent/PostForm';

const Home = () => {
    const [postList, setPostList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getPosts = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get("/api/v1/posts")
            console.log(data);
            setPostList(data);
            setIsLoading(false);
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }

    }

    useEffect(() => {

        getPosts()
    }, [])

    console.log(postList);
    return (
        <div className="home">

            <div className="container">
                <PostForm username="batur" getPosts={getPosts} />
                {
                    postList.map(pl => (
                        <Post key={pl.id} {...pl} />
                    ))
                }
            </div>

        </div>
    )
}

export default Home

/* 
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
*/