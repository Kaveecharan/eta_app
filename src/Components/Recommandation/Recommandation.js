import React, { useEffect, useState } from 'react';
import { StarFilled, StarOutlined, StarTwoTone, SearchOutlined, UpOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Recommandation.scss';

const Recommandation = ({ catProducts, handleProductClick, addToCartFunc }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const handleNextClick = () => {
    setStartIndex(startIndex + 4);
    setEndIndex(endIndex + 4);
  };

  const handlePreviousClick = () => {
    setStartIndex(startIndex - 4);
    setEndIndex(endIndex - 4);
  };

  const renderProducts = () => {
    return catProducts?.slice(startIndex, endIndex).map((product) => {
      const ratingStars = [];
      const rating = Math.round(product.rating);
      for (let i = 0; i < rating; i++) {
        ratingStars.push(<StarFilled style={{ color: 'orange' }} key={i} className='productStar' />);
      }
      if (rating % 1 !== 0) {
        ratingStars.push(<StarTwoTone style={{ color: 'orange' }} key={rating} className='productStar' />);
      }
      const emptyStars = Array(5 - ratingStars.length).fill(
        <StarOutlined style={{ color: 'orange' }} className='productStar' />
      );
      return (
        <div className='product' key={product.id}>
          <p className='product-icon-top'>Save</p>
          <div className='productDetails'>
            <div className='productDescription'>
              <p className='productTitle'>{product.title.toUpperCase()}</p>
              <p className='productTitleDiscription'>
                {product.description.split(' ').slice(0, 4).join(' ').toUpperCase()}
              </p>
            </div>
            <img
              onClick={() => handleProductClick(product.id)}
              className='productTN'
              src={product.thumbnail}
              alt={product.title}
            />
            <div className='productRating'>
              {ratingStars}
              {emptyStars}
            </div>
            <div className='productPrices'>
              <p className='productPrice'>
                <del>${product.price}</del>
              </p>
              <p className='productPrice'>
                ${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <p onClick={() => addToCartFunc({ product })} className='product-icon-bottom'>
            ADD TO CART <UpOutlined />
          </p>
        </div>
      );
    });
  };

  return (
    <>
        <div className='products-heading'>
        <h3>RECOMMANDATIONS FOR YOU</h3>
        <p>Showing {startIndex + 1}-{catProducts?.length > endIndex ? endIndex + 1 : catProducts?.length} products out of {catProducts?.length}</p>
    </div>
    <div className='products'>
    {catProducts?.length > 4 && (
          <LeftOutlined  className='paginationBTN' onClick={startIndex > 0 && handlePreviousClick} />
      )}
      {renderProducts()}
            {catProducts?.length > 4 && (
          <RightOutlined className='paginationBTN' onClick={ endIndex < catProducts.length && handleNextClick} />
      )}
    </div>
    </>
  );
};

export default Recommandation;
