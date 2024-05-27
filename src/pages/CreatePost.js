import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  const navigate = useNavigate();

  const handlePostSaved = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <PostForm onPostSaved={handlePostSaved} />
    </div>
  );
};

export default CreatePost;
