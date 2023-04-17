import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const NavbarContainer = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        const categoriesList = ['All Products', ...response?.data.map(category => category.charAt(0).toUpperCase() + category.slice(1))];
        setCategories(categoriesList);
        } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const url = category === 'All Products' ? '/' : `/products?category=${category}`;
    navigate(url);
  };

  const handleSearch = (value) => {
    let url = '/';
    if (value) {
      url += `?search=${value}`;
      setSelectedCategory('All Products')
      navigate(url);
    } else {
      setSelectedCategory('All Products')
      navigate(url);
    }
  };
  
  


  return (
    <Navbar
      categories={categories}
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
      handleSearch={handleSearch}
    />
  );
};

export default NavbarContainer;
