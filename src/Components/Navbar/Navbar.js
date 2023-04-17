import React from 'react';
import { Menu, Dropdown, Input, Badge } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import {clearNotificationCount} from '../../redux/cartSlice'

const Navbar = ({ categories, selectedCategory, handleCategoryChange, handleSearch }) => {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const menu = (
    <Menu>
      {categories?.map((category, index) => (
        <Menu.Item key={index} onClick={() => handleCategoryChange(category)}>
          {category}
        </Menu.Item>
      ))}
    </Menu>
  );

  const cartBTNClickFunc=()=>{
    dispatch(clearNotificationCount())
    navigate('/cart')
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__company">
          <h4 onClick={()=> navigate('/')}>ETA</h4>
        </div>
        <div className='navbar__right'>
          <div className="navbar__categories">
            <Dropdown overlay={menu} trigger={['click']}>
              <span>
                {selectedCategory} <DownOutlined />
              </span>
            </Dropdown>
          </div>
          <div className="navbar__search">
            <Input.Search
              placeholder="Search for products"
              allowClear
              onSearch={handleSearch}
              enterButton
            />
          </div>
          <div className="navbar__cart">
            <Badge count={cart.notificationCount} >
              <ShoppingCartOutlined onClick={cartBTNClickFunc} style={{ background: '#cecbcb', cursor: 'pointer', padding: '10px', borderRadius: '50%', fontSize: '24px', color: '#000' }}/>
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
