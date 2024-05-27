import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import { Button, TextField, Typography, Box } from '@mui/material';

const ProfileContainer = styled(Box)`
  padding: 2rem;
`;

const FormContainer = styled.form`
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled(Typography)`
  color: red;
`;

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || '');
          setEmail(userData.email || '');
        }
      };
      fetchUserData().catch(error => console.error('Error fetching user data:', error));
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('All fields are required');
      return;
    }
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        name,
        email,
      });
      setError('');
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile: ' + error.message);
    }
  };

  return (
    <ProfileContainer>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <FormContainer onSubmit={handleUpdate}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Profile
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </ProfileContainer>
  );
};

export default Profile;
