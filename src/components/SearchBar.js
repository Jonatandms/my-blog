import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import styled from 'styled-components';

const SearchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <SearchContainer component="form" onSubmit={handleSearch}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '300px', marginRight: '1rem' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
