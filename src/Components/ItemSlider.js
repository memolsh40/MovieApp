import React, { useEffect, useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../style/ItemSlider.css';

export default function ItemSlider({ title,link }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:8080${link}`)
      .then((res) => {
        if (res.data?.dataList?.length > 0) {
      
          setSliderList(res.data.dataList.slice(0, 7)); 
        }
      })
      .catch((err) => {
        console.error("Error fetching slider data:", err);
      });
  }, []);

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, 'Slide ' + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <>
    <p className='itemSliderTitleC'>{title}</p>
    
    <Swiper
  modules={[Virtual, Navigation, Pagination]}
  onSwiper={setSwiperRef}
  slidesPerView={7} // مقدار پیش‌فرض برای نمایش در دسکتاپ
  centeredSlides={true}
  spaceBetween={0}
  initialSlide={3}
  navigation={false}
  
  virtual
  breakpoints={{
    320: { // for mobile
      slidesPerView: 1,
      spaceBetween: 200,
    },
    480: { // for mobile
      slidesPerView: 1,
      spaceBetween: 25,
    },
    768: { // Tablete
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: { // Windows
      slidesPerView: 7,
      spaceBetween: 1,
      centeredSlides: false,
      
    },
  }}
  style={{ marginTop: '0px', padding: '180px' }}
>
  {sliderList.length > 0 ? (
    sliderList.map((slider, index) => (
      <SwiperSlide key={slider.id || index} virtualIndex={index}>
        <div className='sliderItemContainer'>
          <div
            className='sliderItem'
            style={{
              backgroundImage: `url(http://localhost:8080/api/utils/upload/files/${slider.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          ></div>
          <div className='row'>
            <h5 className="text-white item-slider-title">
              {slider.title || 'بدون عنوان'}
            </h5>
          </div>
        </div>
      </SwiperSlide>
    ))
  ) : (
    slides.map((slideContent, index) => (
      <SwiperSlide key={slideContent} virtualIndex={index}>
        {slideContent}
      </SwiperSlide>
    ))
  )}
</Swiper>



    </>
  );
}
