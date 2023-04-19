import { Row, Col, Menu, Dropdown, Badge } from 'antd';
import { StarFilled, LogoutOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {clearNotificationCount} from '../../redux/cartSlice'
import './Navbar.scss';

const Navbar = ({ firstFiveCategories, remainingCategories, selectedCategory, handleCategoryChange, otherCategory, handleOtherCategoryChange }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const menu = (
    <Menu>
      {remainingCategories?.map((otherCategory, index) => (
        <Menu.Item key={index} onClick={() => handleOtherCategoryChange(otherCategory)}>
          {otherCategory}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  const cartBTNClickFunc=()=>{
    dispatch(clearNotificationCount())
    navigate('/cart')
  }
  
  return (
    <div className="navbar">
      <Row className="top-row">
        <Col span={6} className="session">
          <h1 onClick={()=>navigate('/')}>SESSION</h1>
        </Col>
        <Col span={12} className="welcome">
          <div className='welcome-name'>
            <h1>HI, SARATH</h1>
            <h1>WELCOME BACK</h1>
          </div>
            <div className="social-icons">
              <p>
                <span className='amount'>182.000</span>
                <span>Session Dollarts</span>
              </p>
              <p>
                <StarFilled   className="icon" />
                <span>View Stamps</span>
              </p>
              <p>
                <LogoutOutlined className="icon" />
                <span>Sign out</span>
              </p>
          </div>
        </Col>
        <Col span={6} className="shop">
          <div className="shop-info">
            <DownOutlined className='shop-icon'/>
            <div className="opening-time">
              <span>Sessions Sandringham</span>
              <span>Closes at 5p.m</span>
            </div>
          </div>
          <div className="cart">
            <Badge count={cart.notificationCount} >
              <ShoppingCartOutlined className='cart-icon' onClick={cartBTNClickFunc} style={{ cursor: 'pointer'}}/>
            </Badge>
            {/* <ShoppingCartOutlined /> */}
          </div>
        </Col>
      </Row>
      <Row className="bottom-row">
          {firstFiveCategories?.map((category, index) => (
              <div key={index} className="firstfive-categories">
                <span 
                  key={index} 
                  className={`firstfive-category ${selectedCategory === category && otherCategory === 'Others' ? 'active' : ''}`} 
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </span>
              </div>
          ))}
          <Dropdown overlay={menu} trigger={['click']}>
                <span className='firstfive-category'>
                  {otherCategory} <DownOutlined />
                </span>
          </Dropdown>
      </Row>
    </div>
  );
};

export default Navbar