import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styled from 'styled-components';
import { Button, TextField, Typography, Box } from '@mui/material';

const LoginContainer = styled(Box)`
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Redirigir a la lista de posts
    } catch (error) {
      console.error('Error logging in user:', error);
      setError('Error logging in user: ' + error.message);
    }
  };

  return (
    <LoginContainer>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <FormContainer onSubmit={handleLogin}>
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
          Log In
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
