import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Typography, Box } from '@mui/material';

const PostContainer = styled(Box)`
  padding: 2rem;
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost(postSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <PostContainer>
      <Typography variant="h3" component="div" gutterBottom>
        {post.title}
      </Typography>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
      )}
      {post.format === 'markdown' ? (
        <ReactMarkdown>{post.content}</ReactMarkdown>
      ) : (
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </PostContainer>
  );
};

export default PostDetail;
