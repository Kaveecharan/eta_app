import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';
import axios from "axios";
import "./SelectedProduct.scss";

const { Meta } = Card;

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
      <Row gutter={[24, 24]}>
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
        <Col xs={24} md={12}>
          <Card className="product-details-card">
            <Meta title={product.title} description={product.description} />
            <div className="product-details-brand">{product.brand}</div>
                      <p className='productPrice'><del>${product.price}</del> <span>({product.discountPercentage}% OFF)</span> </p>
                      <p className='productPrice'>${ product.price - ((product.price * product.discountPercentage) / 100).toFixed(2) }</p>
                    
            <div className='productRating'>
                      Rating:
                      {ratingStars}
                      {emptyStars}
            </div>
            <div className="product-details-stock">{`Stock: ${product.stock}`}</div>
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
      </Row>
    </div>
  );
};

export default SelectedProduct;
