import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const PostCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PostCard = ({ post }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'posts', post.id));
      window.location.reload(); // Refresh the page to update the list of posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <PostCardContainer>
      {post.featuredImage && (
        <CardMedia
          component="img"
          alt={post.title}
          height="200"
          image={post.featuredImage}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }} />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button size="small" component={Link} to={`/post/${post.id}`} variant="contained" color="primary">
          Read More
        </Button>
        {currentUser?.role === 'admin' && (
          <>
            <Button size="small" variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/edit/${post.id}`)}>
              Edit
            </Button>
          </>
        )}
      </Box>
    </PostCardContainer>
  );
};

export default PostCard;
