import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Button, Breadcrumb, Tabs  } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';
import axios from "axios";
import "./SelectedProduct.scss";

const { Meta } = Card;
const { TabPane } = Tabs;

const SelectedProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const { productId } = useParams();
  const dispatch = useDispatch()

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
        setSelectedImage(response.data.thumbnail);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

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

  return (
    <div className="product-details">
      <div className="breadcrumb-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>SHOP</Breadcrumb.Item>
          <Breadcrumb.Item>{product?.category?.toUpperCase()}</Breadcrumb.Item>
          <Breadcrumb.Item>{product?.title?.toUpperCase()}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="product-details-card">
            <Meta title={product.title} description={product.description} />
            <div className="product-details-brand"><div className='productRating'>{ratingStars}{emptyStars}</div>{product.brand}</div>
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
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
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
    </div>
  );
};

export default SelectedProduct;
