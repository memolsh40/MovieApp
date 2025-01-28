import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SmallBanner from '../Components/SmallBanner'



import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";

const SliderComponent = ({ sliderList }) => (
  <Swiper
    style={{
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff",
      overflow: "hidden",
      height:'100%',
      width:'100%'
    }}
    speed={600}
    parallax={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Parallax, Pagination, Navigation, Autoplay]}
    className="mySwiper border-slider"
  >
    {sliderList.map((slider, index) => (
      <SwiperSlide
      key={index}
      style={{
        backgroundImage: `url(http://localhost:8080/api/utils/upload/files/${slider.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <a 
        href={slider.link || "#"} 
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <div className="sliderTextContainer">
          <div className="title text-white slider-Text" data-swiper-parallax="-300">
            {slider.title || "بدون عنوان"}
          </div>
        </div>
      </a>
    </SwiperSlide>
    
    ))}
  </Swiper>
);

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/slider")
      .then((res) => {
        if (res.data?.dataList?.length > 0) {
          setSliderList(res.data.dataList);
        }
      })
      .catch((err) => {
        console.error("Error fetching slider data:", err);
      });
  }, []);

  if (sliderList.length === 0) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="rowContainer custom-dark-color " >

 
    <div className="largeSlider">
      <SliderComponent 

        sliderList={sliderList} 
       
      />
    </div>
    
    <SmallBanner/>
    
  </div>


  

  );
}
