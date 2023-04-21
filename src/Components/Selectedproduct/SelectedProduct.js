import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Typography, Button, Breadcrumb, Tabs  } from "antd";
import { StarFilled, StarOutlined, StarTwoTone, ShoppingCartOutlined, MinusOutlined, PlusOutlined, FormOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Recommandation from '../Recommandation/Recommandation'
import axios from "axios";
import "./SelectedProduct.scss";

const { Meta } = Card;
const { TabPane } = Tabs;

const SelectedProduct = () => {
  const [product, setProduct] = useState([]);
  const [productCat, setProductCat] = useState('')
  const [catProducts, setCatProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const { productId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const addToCartFunc = ({product}) => {
    dispatch(addItem({ id: product.id, image: product.thumbnail, name: product.title, quantity: 1, price: product.price }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${productId}`);
        console.log("response ", response.data);
        setProduct(response.data);
        setProductCat(response.data.category)
        setSelectedImage(response.data.thumbnail);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(()=>{
    const fetchCatProducts=async()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/${product?.category}`);
        setCatProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCatProducts();
  },[productCat])

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const ratingStars = [];
  const rating = Math.round(product.rating);
  for (let i = 0; i < rating; i++) {
    ratingStars.push(
      <StarFilled style={{ color: "orange" }} key={i} className="productStar" />
    );
  }
  if (rating % 1 !== 0) {
    ratingStars.push(
      <StarTwoTone
        style={{ color: "orange" }}
        key={rating}
        className="productStar"
      />
    );
  }
  const emptyStars = Array(5 - ratingStars.length).fill(
    <StarOutlined style={{ color: "orange" }} className="productStar" />
  );

  const { Title } = Typography;

  const [caseCount, setCaseCount] = useState(1);
  const [eachCount, setEachCount] = useState(1);

  const handleCaseCountChange = (type) => {
    if (type === 'increment') {
      setCaseCount(caseCount + 1);
    } else if (type === 'decrement' && caseCount > 0) {
      setCaseCount(caseCount - 1);
    }
  };

  const handleEachCountChange = (type) => {
    if (type === 'increment') {
      setEachCount(eachCount + 1);
    } else if (type === 'decrement' && eachCount > 0) {
      setEachCount(eachCount - 1);
    }
  };

  return (
    <div className="product-details">
      <div className="breadcrumb-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>SHOP</Breadcrumb.Item>
          <Breadcrumb.Item>{product?.category?.toUpperCase()}</Breadcrumb.Item>
          <Breadcrumb.Item>{product?.title?.toUpperCase()}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row  gutter={[24, 24]}>
        <Col flex={1}>
          <div className="product-details-card">
            <p className='productBrand'>{product.brand?.toUpperCase()}</p>
            <Meta title={product.title?.toUpperCase()} description={product.description?.toUpperCase()} />
            <div className="product-details-rating">{ratingStars}{emptyStars}<FormOutlined style={{color:"gray", margin:'0 15px'}}/>Write a Review</div>
                <div className="product-detail">
                  <p className='productPrice'><del>${product.price}</del> <span>({product.discountPercentage}% OFF)</span> </p>
                  <p className='productPrice'>${ product.price - ((product.price * product.discountPercentage) / 100).toFixed(2) }</p>
                  <div className="product-details-stock">{`Stock: ${product.stock}`}</div>
                </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={()=>addToCartFunc({product})}
              block
              style={{ backgroundColor: '#B2824A' }}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
        <Col flex={1}>
          <div className="product-image-container">
            <Image className="thumb-image" src={selectedImage} preview={true} />
            <div className="image-list">
              {product?.images?.map((imageUrl) => (
                <Image
                  key={imageUrl}
                  className={`image ${
                    selectedImage === imageUrl ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(imageUrl)}
                  src={imageUrl}
                  preview={false}
                  alt={product.title}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col  flex={1} className="product-selection">
          <div className="size-options">
            <Title className="size-heading" level={5}>Size Options</Title>
            <div className="case-option">
              <span>Case</span>
              <Button className="option-button" type="primary" icon={<MinusOutlined />} size="large" onClick={() => handleCaseCountChange('decrement')} />
              <span className="count-span">{caseCount}</span>
              <Button className="option-button" type="primary" icon={<PlusOutlined />} size="large" onClick={() => handleCaseCountChange('increment')} />
              <span>${caseCount == 0 ? '00' : 10 * caseCount}</span>
            </div>
            <div className="each-option">
              <span>Each</span>
              <Button className="option-button" type="primary" icon={<MinusOutlined />} size="large" onClick={() => handleEachCountChange('decrement')} />
              <span className="count-span">{eachCount}</span>
              <Button className="option-button" type="primary" icon={<PlusOutlined />} size="large" onClick={() => handleEachCountChange('increment')} />
              <span>${eachCount == 0 ? '00' : 2 * eachCount}</span>
            </div>
          </div>
        </Col>
      </Row>
      <div className="product-details-tab">
          <Tabs defaultActiveKey="1">
            <TabPane tab="ABOUT THIS PRODUCT" key="1">
              <p>This product is amazing and will change your life forever!</p>
            </TabPane>
            <TabPane tab="PRODUCT SPECIFICATIONS" key="2">
              <p>Here are the specifications of this amazing product:</p>
              <ul>
                <li>Size: 10 inches</li>
                <li>Weight: 5 pounds</li>
                <li>Color: Red</li>
              </ul>
            </TabPane>
            <TabPane tab="AWARDS" key="3">
              <p>This product has won the following awards:</p>
              <ul>
                <li>Best product of the year</li>
                <li>Most innovative product</li>
                <li>Product with the best design</li>
              </ul>
            </TabPane>
          </Tabs>
        </div>
        <Recommandation catProducts={catProducts} handleProductClick={handleProductClick} addToCartFunc={addToCartFunc}/>
    </div>
  );
};

export default SelectedProduct;
