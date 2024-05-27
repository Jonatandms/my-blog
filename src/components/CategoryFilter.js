import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const categoriesSet = new Set();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.category) {
          categoriesSet.add(data.category);
        }
      });
      setCategories(Array.from(categoriesSet));
    };

    fetchCategories().catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleChange}
        label="Category"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {categories.map(category => (
          <MenuItem key={category} value={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
