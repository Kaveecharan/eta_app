import React from 'react';
import Layout from '../Components/Layout';
import Slider from '../Components/Slider/Slider';
import Products from '../Components/Products/Products';
import Accordion from '../Components/Accordion/Accordion';
import './HomePage.scss'; // Import the SCSS file

const HomePage = () => {
  return (
    <div className="homepage">
      <Layout className="layout">
        <Slider className="slider" />
        <div className="content-container">
          <Accordion className="accordion" />
          <Products className="products" />
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
