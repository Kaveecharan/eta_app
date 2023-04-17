import React from 'react';
import Layout from '../Components/Layout';
import SelectedProduct from '../Components/Selectedproduct/SelectedProduct';
import ReviewSlider from '../Components/ReviewSlider/ReviewSlider';

const ProductPage = () => {
  return (
    <Layout>
      <SelectedProduct />
      <ReviewSlider/>
    </Layout>
  );
};

export default ProductPage