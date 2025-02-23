"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rasmImg from "@/images/rasm.webp";
import rasm2Img from "@/images/rasm2.jpeg";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Slider {...settings}>
        <div className="relative w-full h-[400px]">
          <Image src={rasmImg} alt="Slide 1" layout="fill" objectFit="cover" />
        </div>
        <div className="relative w-full h-[400px]">
          <Image src={rasm2Img} alt="Slide 2" layout="fill" objectFit="cover" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
