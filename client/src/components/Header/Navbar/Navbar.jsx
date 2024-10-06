import React from "react";
import styles from '../Navbar/Navbar.module.scss';
import buttons from '../../../styles/button.module.scss'
import logo from '../../../assets/zenlish.png';
import '../../../styles/index.scss';
import { Link } from 'react-router-dom';  
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
    return (
        <nav className={styles.header_nav}>
            <div className={styles.header_main}>
                <button 
                    className="btn btn-primary" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasRight" 
                    aria-controls="offcanvasRight"
                >
                    <i className="bi bi-list"></i>
                </button>
                <div 
                    className="offcanvas offcanvas-end" 
                    tabIndex="-1" 
                    id="offcanvasRight" 
                    aria-labelledby="offcanvasRightLabel"
                >
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                        <button 
                            type="button" 
                            className="btn-close text-reset" 
                            data-bs-dismiss="offcanvas" 
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        Các danh mục
                    </div>
                </div>
                <img src={logo} alt="" className={styles.logo} />
                
                <ul className={styles.header_main_nav}>
                    <li>
                     <Link to="/about">Về chúng tôi <i className="bi bi-caret-down-fill"></i></Link>
                        <div className={styles.sub_menu}>
                            <Link>
                                <i class="bi bi-caret-right-fill"></i>
                                <p>Hệ thống cơ sở</p>
                             
                            </Link>
                            <Link>
                                <i class="bi bi-caret-right-fill"></i>
                                <p>Giới thiệu</p>
                             

                            </Link>
                            <Link>
                                <i class="bi bi-caret-right-fill"></i>
                                <p>Tin tức</p>
                            </Link>
                            <Link>
                                <i class="bi bi-caret-right-fill"></i>
                                <p>Tuyển dụng</p>
                            </Link>
                        </div>
                    </li>
                    <li>
                     <Link to="/courses">Khóa học <i className="bi bi-caret-down-fill"></i></Link>
                    </li>
                    <li>
                     <Link to="/student">Học viên <i className="bi bi-caret-down-fill"></i></Link>
                    </li>
                    <li>
                     <Link to="/document">Tài liệu <i className="bi bi-caret-down-fill"></i></Link>
                    </li>
                </ul>

                <ul className={styles.button_nav}>
                    <li><div className={`${buttons.btn} ${styles.button_search}`} ><i className="bi bi-search"></i></div></li>
                    <li> <div className={`${buttons.btn} ${styles.button_test}`}>Test online</div></li>
                </ul>
            
            </div>
           
        </nav>
    );
}

export default Navbar;
