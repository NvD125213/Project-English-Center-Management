import React from 'react';
import styles from './HomeBanner.module.scss';
import img1 from '../../../assets/zenlish-chot-1.jpg';
import img2 from '../../../assets/zenlish-chot-2.jpg';
import img3 from '../../../assets/zenlish-chot-3.jpg';
import img4 from '../../../assets/zenlish-chot-2.jpg';
import Slider from "react-slick";

const HomeBanner = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        
        <section className={styles.home_banner}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm-4">
                        <div className={styles.col_inner}>
                            <h2><strong>HỌC TOEIC MỘT LẦN LÀ ĐẠT</strong></h2>
                            <button type="button" className="btn btn-success">
                                <span>Kiểm tra trình độ nền miễn phí trước khi chọn lộ trình học chuẩn</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className='container'>
                            
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
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default HomeBanner;
