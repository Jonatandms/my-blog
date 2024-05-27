import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Button, TextField, Typography, Box } from '@mui/material';

const RegisterContainer = styled(Box)`
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !name) {
      setError('All fields are required');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name,
        role: 'user' // Añadir campo de rol
      });
      navigate('/'); // Redirigir a la lista de posts
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user: ' + error.message);
    }
  };

  return (
    <RegisterContainer>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <FormContainer onSubmit={handleRegister}>
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
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Register
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </RegisterContainer>
  );
};

export default Register;
