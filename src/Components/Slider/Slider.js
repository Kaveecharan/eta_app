import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./Slider.scss";
import { sliderItems } from "../../Assests/data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrev = () => {
    setSlideIndex((slideIndex - 1 + sliderItems.length) % sliderItems.length);
  };

  const handleNext = () => {
    setSlideIndex((slideIndex + 1) % sliderItems.length);
  };

  useEffect(() => {
    let intervalId;
    const toggleSlideIndex = () => {
      setSlideIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    };
  
    intervalId = setInterval(toggleSlideIndex, 3000);
  
    setTimeout(() => {
      clearInterval(intervalId);
    }, 12000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="slider-container">
      {sliderItems.map((item, index) => (
        <div
          key={item.id}
          className={`slider-slide ${
            slideIndex === index ? "active" : ""
          }`}
        >
          <div className="slider-image-container">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="slider-info-container">
            <h1 className="slider-title">{item.title}</h1>
            <p className="slider-desc">{item.desc}</p>
          </div>
        </div>
      ))}
      <div
        className="slider-arrow slider-arrow-left"
        onClick={handlePrev}
      >
        <ArrowLeftOutlined className="slider-arrow-icon" />
      </div>
      <div
        className="slider-arrow slider-arrow-right"
        onClick={handleNext}
      >
        <ArrowRightOutlined className="slider-arrow-icon" />
      </div>
      <div className="slider-dots">
        {sliderItems.map((item, index) => (
          <span
            key={item.id}
            className={`slider-dot ${
              slideIndex === index ? "active" : ""
            }`}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
