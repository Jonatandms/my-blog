import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Button } from '@mui/material';

const AboutContainer = styled(Box)`
  padding: 4rem 2rem;
  background-color: #f4f4f9;
  text-align: center;
`;

const AboutContent = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutSection = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <Typography variant="h4" component="div" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          I am a passionate programmer and avid runner. This blog is a space where I share my knowledge about programming, tech, and my experiences in the world of running.
        </Typography>
        <Button variant="contained" color="primary" href="/about">
          Read More
        </Button>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
