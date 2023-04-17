import { useDispatch, useSelector } from 'react-redux';
import { removeItem, emptyTheCart } from '../../redux/cartSlice'
import { Button, InputNumber, Empty } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './Cart.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log('cart ', cart)

  const handleRemoveItem = (id, price) => {
    dispatch(removeItem({ id, quantity: 1, price}));
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className='cartImage'>
            <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
                <Button onClick={() => handleRemoveItem(item.id, item.price)}>Remove</Button>
                <p>Total Price: ${item.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
      {cart.total > 0 ? <div className='checkoutBTN'>
        <p>Sub Total: ${cart.total}</p>
        <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{fontFamily: 'Titillium Web'}}
              onClick={()=> dispatch(emptyTheCart())}
            >
              Checkout
        </Button>
       </div> : <Empty style={{fontFamily: 'Titillium Web'}} description="Your cart is empty" />
}
      </div>
    </div>
  );
};

export default Cart;
