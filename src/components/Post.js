import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Chip, Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  margin: 0 0 1rem 0;
`;

const PostExcerpt = styled.p`
  color: #555;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TagContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async () => {
    if (!currentUser) {
      alert('You must be logged in to like a post.');
      return;
    }
    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, { likes: likes + 1 });
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostExcerpt>{post.excerpt}</PostExcerpt>
      <TagContainer>
        {post.tags && post.tags.map(tag => (
          <Chip key={tag} label={tag} variant="outlined" />
        ))}
      </TagContainer>
      {post.category && <Chip label={post.category} color="primary" sx={{ mt: 1 }} />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <StyledLink to={`/post/${post.id}`}>Read More</StyledLink>
        <Button onClick={handleLike} variant="contained" color="primary">
          Like ({likes})
        </Button>
      </Box>
    </PostContainer>
  );
};

export default Post;
