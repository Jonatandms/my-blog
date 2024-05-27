import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useAuth } from '../context/AuthContext';

const CommentListContainer = styled.div`
  margin-top: 2rem;
`;

const CommentList = ({ comments, postId, setComments }) => {
  const { currentUser } = useAuth();
  const filteredComments = currentUser?.role === 'admin'
    ? comments
    : comments.filter(comment => comment.approved);

  const handleCommentUpdated = (id, updatedComment) => {
    setComments(prevComments =>
      prevComments.map(comment => (comment.id === id ? updatedComment : comment))
    );
  };

  const handleCommentDeleted = (id) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };

  return (
    <CommentListContainer>
      {filteredComments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
          onCommentUpdated={handleCommentUpdated}
          onCommentDeleted={handleCommentDeleted}
        />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;
