import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const NavbarContainer = () => {
  const [firstFiveCategories, setFirstFiveCategories] = useState([]);
  const [remainingCategories, setRemainingCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [otherCategory, setOtherCategory] = useState('Others')
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        const fiveCategories = response?.data.slice(0, 5).map(category => category.charAt(0).toUpperCase() + category.slice(1));
        fiveCategories.unshift("All Products");
        const balanceCategories = response?.data.slice(5).map(category => category.charAt(0).toUpperCase() + category.slice(1));
        setFirstFiveCategories(fiveCategories);
        setRemainingCategories(balanceCategories);
        } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setOtherCategory('Others');
    const url = category === 'All Products' ? '/' : `/products?category=${category}`;
    navigate(url);
  };

  const handleOtherCategoryChange = (category) => {
    setOtherCategory(category);
    const url = category === 'Others' ? '/' : `/products?category=${category}`;
    navigate(url);
  };
  
  return (
    <Navbar
      firstFiveCategories={firstFiveCategories}
      remainingCategories={remainingCategories}
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
      handleOtherCategoryChange={handleOtherCategoryChange}
      otherCategory={otherCategory}
    />
  );
};

export default NavbarContainer;
