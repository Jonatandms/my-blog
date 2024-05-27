import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, deleteDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';
import CommentForm from './CommentForm';

const CommentContainer = styled(Card)`
  margin-top: 1rem;
  padding: 1rem;
`;

const Comment = ({ comment, postId, onCommentUpdated, onCommentDeleted, nested = false }) => {
  const { currentUser } = useAuth();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [likes, setLikes] = useState(comment.likes || 0);

  const handleApprove = async () => {
    if (postId && comment.id) {
      try {
        const commentRef = doc(db, `posts/${postId}/comments`, comment.id);
        await updateDoc(commentRef, { approved: !comment.approved });
        onCommentUpdated(comment.id, { ...comment, approved: !comment.approved });
      } catch (error) {
        console.error('Error approving comment:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (postId && comment.id) {
      try {
        const commentRef = doc(db, `posts/${postId}/comments`, comment.id);
        await deleteDoc(commentRef);
        onCommentDeleted(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleEdit = async () => {
    if (postId && comment.id) {
      try {
        const commentRef = doc(db, `posts/${postId}/comments`, comment.id);
        await updateDoc(commentRef, { text: newText });
        onCommentUpdated(comment.id, { ...comment, text: newText });
        setEditing(false);
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert('You must be logged in to like a comment.');
      return;
    }
    if (postId && comment.id) {
      const commentRef = doc(db, `posts/${postId}/comments`, comment.id);
      try {
        await updateDoc(commentRef, { likes: increment(1) });
        setLikes(likes + 1);
      } catch (error) {
        console.error('Error liking comment:', error);
      }
    }
  };

  return (
    <CommentContainer>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>{comment.author.charAt(0)}</Avatar>
          <Box>
            <Typography variant="h6">{comment.author}</Typography>
            {editing ? (
              <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
            ) : (
              <Typography variant="body1">{comment.text}</Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          {currentUser?.role === 'admin' && (
            <>
              <Button variant="outlined" color="primary" onClick={handleApprove}>
                {comment.approved ? 'Disapprove' : 'Approve'}
              </Button>
              {editing ? (
                <Button variant="contained" color="primary" onClick={handleEdit}>Save</Button>
              ) : (
                <Button variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
              )}
              <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            </>
          )}
          {currentUser && (
            <Button variant="outlined" onClick={() => setReplying(!replying)}>
              {replying ? 'Cancel' : 'Reply'}
            </Button>
          )}
          <Button variant="outlined" onClick={handleLike}>Like ({likes})</Button>
        </Box>
        {replying && (
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onAddComment={onCommentUpdated}
          />
        )}
      </CardContent>
    </CommentContainer>
  );
};

export default Comment;
