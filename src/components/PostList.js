import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostList = ({ posts }) => (
  <PostListContainer>
    {posts.map(post => <Post key={post.id} post={post} />)}
  </PostListContainer>
);

export default PostList;
