import React from 'react'
import '../../styles/index.scss'

const Topbar = () => {
    return (
      <div className="topbar bg-light py-2">
        <div className="container d-flex justify-content-around align-items-center mw-100">
          <div className="left-section">
            <a href="tel:123-456-7890" className="me-3 text-dark">
               <i className="bi bi-telephone-forward-fill mx-2"></i>
               <span>  0968-456-7890 </span>
            </a>
          </div>
          <div className="left-section">
            <span>Zenlish - Học TOEIC 1 Lần Là Đạt</span>
          </div>

          <div className="right-section d-flex">
           
            <a href="#login" className="me-3 text-dark">
              Đăng nhập
            </a>
            <a href="#register" className="text-dark">
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    );
  };

export default Topbar
