import React, { useState, useEffect } from 'react';
import { Skeleton, Pagination} from 'antd';
import { StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cartSlice'
import axios from 'axios'
import './Products.scss';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const location = useLocation();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCartFunc = ({product}) => {
    dispatch(addItem({ id: product.id, image: product.thumbnail, name: product.title, quantity: 1, price: product.price }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const paramsObj = JSON.parse(JSON.stringify(Object.fromEntries(queryParams.entries())));
    const categoryParam = paramsObj.category;
    const searchParam = paramsObj.search;

    console.log('paramsObj ', paramsObj.category, paramsObj.search)

    setCategory(categoryParam ? categoryParam : '');
    setSearch(searchParam ? searchParam : '');

    const fetchProducts = async () => {
        setLoading(true);
        setCurrentPage(1);
        if(!paramsObj.category && !paramsObj.search){
          try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
              console.log('response ', response.data)
              setProducts(response.data.products);
              setTotalPages(Math.ceil(response.data.products.length / 16));
            } catch (error) {
              console.error(error);
            }
      }

        else if(paramsObj.category){
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/${paramsObj.category}`);
                console.log('response ', response.data)
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.products.length / 16));
              } catch (error) {
                console.error(error);
              }
        }
        else if(paramsObj.search){
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/search?q=${paramsObj.search}`);
                console.log('response ', response.data)
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.products.length / 16));
              } catch (error) {
                console.error(error);
              }
        }
        setLoading(false);
      };
      fetchProducts();
  }, [location.search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const renderProductGrid = () => {
    const startIndex = (currentPage - 1) * 16;
    const endIndex = startIndex + 16;
    const productsToRender = products.slice(startIndex, endIndex);
  
    return (
      <div className='products'>
        {loading
          ?
            <div className='products'>
              {[...Array(16)].map((_, index) => (
                <div className='product' key={index}>
                  <Skeleton.Image active={true} className='skeleton-thumbnail' style={{ width: '220px', height: '220px', marginBottom: '10px'}} />
                  <Skeleton.Input active={true} style={{margin: '5px'}} size='small' />
                  <Skeleton.Input active={true} style={{margin: '5px'}} size='small' />
                </div>
              ))}
            </div>
          : productsToRender.map((product) => {
              const ratingStars = [];
              const rating = Math.round(product.rating);
              for (let i = 0; i < rating; i++) {
                ratingStars.push(<StarFilled style={{ color: 'orange' }} key={i} className="productStar" />);
              }
              if (rating % 1 !== 0) {
                ratingStars.push(<StarTwoTone style={{ color: 'orange' }} key={rating} className="productStar" />);
              }
              const emptyStars = Array(5 - ratingStars.length).fill(<StarOutlined style={{ color: 'orange' }} className="productStar" />);
              return (
                <div className='product' key={product.id}>
                  <img className='productTN' src={product.thumbnail} alt={product.title} />
                  <div className='product-Icons'>
                    <SearchOutlined onClick={()=> handleProductClick(product.id)} className='product-icon' style={{  color: 'gray', fontSize: '28px', cursor: 'pointer'}}/>
                    <ShoppingCartOutlined onClick={()=> addToCartFunc({product})} className='product-icon'  style={{ color: 'gray', fontSize: '28px', cursor: 'pointer'}}/>
                  </div>
                  <div className='productDetails'>
                    <p className='productTitle'>{product.title}</p>
                    <div className='productRating'>
                      {ratingStars}
                      {emptyStars}
                    </div>
                    <div className='productPrices'>
                      <p className='productPrice'><del>${product.price}</del></p>
                      <p className='productPrice'>${ product.price - ((product.price * product.discountPercentage) / 100).toFixed(2) }</p>
                    </div>
                  </div>
                </div>
              );
            })
        }
        {products.length == 0 && <Empty style={{fontFamily: 'Titillium Web'}} description="No products found!" />}
      </div>
    );
  };

  return (
    <>
        {renderProductGrid()}
        <Pagination
            current={currentPage}
            total={totalPages}
            pageSize={1}
            onChange={handlePageChange}
            style={{ marginBottom: '50px', textAlign: 'center' }}
        />
    </>
  );
};

export default Products;
