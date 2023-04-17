import React, { useState, useEffect } from 'react';
import { Carousel, Avatar } from 'antd';
import './ReviewSlider.scss';
import { reviews } from '../../Assests/data';

function ReviewSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        <Carousel
          dotPosition="bottom"
          autoplay
          effect="fade"
          beforeChange={(prev, next) => setIndex(next)}
        //   customPaging={(i) => <FaQuoteRight className="icon" />}
        >
          {reviews.map((review, personIndex) => {
            const { id, image, name, text } = review;

            let position = 'nextSlide';
            if (personIndex === index) {
              position = 'activeSlide';
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === reviews.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <div className={position} key={id}>
                <img className='person-img' src={image}/>
                <h4>{name}</h4>
                <p className='review-para'>{text}</p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}

export default ReviewSlider;
