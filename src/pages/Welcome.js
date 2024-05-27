import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const Welcome = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>Welcome to My Blog</Typography>
      <Typography variant="h6" gutterBottom>
        Please register or log in to view the posts.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
          Register
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/login">
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
