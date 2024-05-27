import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import PostList from '../components/PostList';

const SearchResultsContainer = styled.div`
  padding: 2rem;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const queryParams = useQuery();
  const searchTerm = queryParams.get('query');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchTerm) {
        const postsQuery = query(
          collection(db, 'posts'),
          where('title', '>=', searchTerm),
          where('title', '<=', searchTerm + '\uf8ff')
        );
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      }
    };

    fetchPosts().catch(error => console.error('Error fetching posts:', error));
  }, [searchTerm]);

  return (
    <SearchResultsContainer>
      <h1>Search Results</h1>
      <PostList posts={posts} />
    </SearchResultsContainer>
  );
};

export default SearchResults;
