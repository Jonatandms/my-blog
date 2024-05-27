import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, mt: 'auto' }}>
      <Toolbar>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="body1" color="inherit">
            &copy; 2024 My Blog
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
