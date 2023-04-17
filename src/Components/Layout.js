import React from 'react';
import NavbarContainer from './Navbar/NavbarContainer';
import AppFooter from './AppFooter/AppFooter';

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarContainer />
      {children}
      <AppFooter />
    </div>
  );
};

export default Layout;
