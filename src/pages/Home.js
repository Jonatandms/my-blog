import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { Grid } from '@mui/material';
import SearchBar from '../components/SearchBar';

const HomeContainer = styled.div`
  padding: 2rem;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Posts:', postsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <SearchBar />
    <HomeContainer>
        <Grid container spacing={4}>
          {posts.length > 0 ? (
            posts.map(post => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </Grid>
      </HomeContainer>
    </>
  );
};

export default Home;