import React from "react";
import Slider from "react-slick";
import "./BotPageCarousel.css";

const ChannelCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    swipeToSlide: true,
    arrows: false,
  };

  const carouselData = [
    {
      title:
        "Never miss any action happening at Pragati Maidan & Expo Center, Noida",
      className: "channel-slide-1",
    },
    {
      title: "Checkout what's being develoved at the bleeding edge",
      className: "channel-slide-2",
    },
    {
      title: "Meet your fellow industry leaders",
      className: "channel-slide-3",
    },
    {
      title: "Help build the community around your industry",
      className: "channel-slide-4",
    },
  ];

  const slides = carouselData.map((slideData, idx) => (
    <div className={`${slideData.className} channel-slide`} key={idx}>
      <div className="channel-slide-content">
        <div className="channel-slide-title">{slideData.title}</div>
      </div>
    </div>
  ));

  return (
    <div className="channel-slide-container">
      <Slider {...settings}>{slides}</Slider>
    </div>
  );
};

export default ChannelCarousel;
