import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const FormContainer = styled.form`
  margin-top: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const CommentForm = ({ postId, parentId = null, onAddComment }) => {
  const { currentUser } = useAuth();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAuthor(currentUser.name || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Evita múltiples envíos
    setError('');
    setLoading(true);
    if (!author || !text) {
      setError('Both fields are required');
      setLoading(false);
      return;
    }
    const newComment = {
      author,
      text,
      parentId,
      approved: false,
    };
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), newComment);
      onAddComment({ id: docRef.id, ...newComment });
      setText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error adding comment: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        disabled={true}
      />
      <Textarea
        placeholder="Your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" disabled={loading}>Add Comment</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default CommentForm;
