import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';

const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/welcome'); // Redirigir a la página de bienvenida
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      {currentUser?.role === 'admin' && (
        <>
          <Button color="inherit" component={Link} to="/createpost">
            Crear Post
          </Button>
        </>
      )}
      {currentUser ? (
        <>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Box>
  );
};

export default Header;
