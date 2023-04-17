import React from 'react';
import Layout from '../Components/Layout';
import Slider from '../Components/Slider/Slider';
import Products from '../Components/Products/Products';

const HomePage = () => {
  return (
    <Layout>
      <Slider />
      <Products />
    </Layout>
  );
};

export default HomePage;
