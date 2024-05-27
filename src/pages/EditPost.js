import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePostSaved = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <PostForm postId={id} onPostSaved={handlePostSaved} />
    </div>
  );
};

export default EditPost;
