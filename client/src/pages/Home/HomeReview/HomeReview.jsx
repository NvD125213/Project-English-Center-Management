import React from 'react';
import ReactPlayer from 'react-player';
import CustomCard from '../../../components/Card/Card';
import './HomeReview.css'
import img1 from '../../../assets/hv1.jpg'
import img2 from '../../../assets/hv2.jpg'
import img3 from '../../../assets/hv3.jpg'

import Slider from 'react-slick';


const HomeReview = () => {
    const items = [
        {
            key: '1',
            img: img1,
            title: 'Nguyễn Việt Đức',
            content: 'Trung tâm dạy rất hay và tâm huyết!',
        },
        {
            key: '2',
            img:img2,
            title: 'Nguyễn Xuân Thắng',
            content: 'Trung tâm dạy rất hay và tâm huyết, còn thầy thì vui tính!',
        },
        {
            key: '3',
            img:img3,
            title: 'Đào Bá Lộc',
            content: 'Trung tâm dạy rất hay và tâm huyết, còn thầy thì vui tính!',
        },
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
      };
  return (
    <section className='home_review'>
      <h2>Học viên nói gì về Zenlish</h2>
      <p>+30.000 học viên tin tưởng khi chọn học tại Zenlish<br/></p>
      <div className="container">
        <div className="row">
            <div className="col-md-4">
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=o3F3hH-WTus'
                    width='90%'
                    height='18em'
                />
            </div>
            <div className="col-md-8 "> 
            <Slider {...settings} className='mb-5'>
                {items.map( 
                    item => (    
                        <CustomCard avatar={item.img} title={item.title} content={item.content} />
                    )
                )}
            </Slider>
            <Slider {...settings}>
                {items.map( 
                    item => (    
                        <CustomCard avatar={item.img} title={item.title} content={item.content} />
                    )
                )}
            </Slider>
               
            </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReview;