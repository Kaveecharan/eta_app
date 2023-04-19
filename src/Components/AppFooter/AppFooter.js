import React from 'react';
import { Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, TwitterOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import Logo from '../../Assests/Logo.png'
import FooterImage from '../../Assests/FooterImage.png'

import './AppFooter.scss';

const AppFooter = () => {
  return (
    <div className='footer'>
      <img className='footer-image' src={FooterImage} alt='footer-image'/>
      <div className='footer-container'>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <div className='footer-column'>
              <img className='footer-logo' src={Logo} alt='logo'/>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className='footer-column'>
              <h3 className='heading'>CONTACT US</h3>
              <div className='contact-details'>
                <div className='contact-row'>
                  <PhoneOutlined />
                  <p>1-800-123-4567</p>
                </div>
                <div className='contact-row'>
                  <MailOutlined />
                  <p>info@company.com</p>
                </div>
                <div className='contact-row'>
                  <EnvironmentOutlined />
                  <p>123 Main St, Anytown USA</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className='footer-column'>
              <h3 className='heading'>NAVIGATE</h3>
              <div className='navigate-links'>
                <p>Home</p>
                <p>About Us</p>
                <p>Services</p>
                <p>Contact Us</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className='footer-column'>
              <h3 className='heading'>FOLLOW</h3>
              <div className='social-links'>
                <TwitterOutlined />
                <FacebookOutlined />
                <InstagramOutlined />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2023 ETA. All Rights Reserved.</p>
        <div className='footer-bottom-right'>
        <p className="footer-text">Terms and Conditions.</p>
        <p className="footer-text">Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;