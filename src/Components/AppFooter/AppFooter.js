import React from 'react';
import { Layout } from 'antd';
import './AppFooter.scss';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">We're a one-stop shop for all your online shopping needs. Our mission is to provide high-quality products at affordable prices, with exceptional customer service to match.</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-list">
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Home & Garden</a></li>
            <li><a href="#">Fashion & Beauty</a></li>
            <li><a href="#">Toys & Games</a></li>
            <li><a href="#">Sports & Outdoors</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-text">Feel free to reach out to us with any questions or concerns:</p>
          <ul className="footer-list">
            <li><a href="#">Email: support@ETAShopping.com</a></li>
            <li><a href="#">Phone: 555-123-4567</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2023 ETA. All Rights Reserved.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
