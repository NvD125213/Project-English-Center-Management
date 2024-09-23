import React from 'react';
import './index.css';
import Slider from "react-slick";
import img1 from '../../../assets/zenlish-1-1.jpg';
import img2 from '../../../assets/zenlish-2-1.jpg';
import img3 from '../../../assets/zenlish-giao-vien-7.png';
import img4 from '../../../assets/zenlish-giao-vien-8.jpg';
import img5 from '../../../assets/zenlish-giao-vien-9.jpg';
import img6 from '../../../assets/zenlish-3-1.jpg';

const HomeTeacher = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
      };
    return (
        <section className='home_teacher'>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '1em'}}>
                    <strong>100% GIÁO VIÊN ZENLISH ĐẠT 900+ TOEIC QUỐC TẾ</strong>
                </h2>
                <div className="slider-container">
                    <Slider {...settings} className='slider_teacher'>
                        <div className='card'>
                            <img src={img4} className='w-100' alt='' />
                        </div>
                        <div className='card'>
                            <img src={img1} className='w-100' alt='' />
                        </div>
                        <div className='card'>
                            <img src={img2} className='w-100' alt='' />
                        </div>
                        <div className='card'>
                            <img src={img3} className='w-100' alt='' />
                        </div>
                        <div className='card'>
                            <img src={img5} className='w-100' alt='' />
                        </div>
                        <div className='card'>
                            <img src={img6} className='w-100' alt='' />
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default HomeTeacher;
