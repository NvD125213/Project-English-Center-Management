import React from "react";
import styles from '../Navbar/Navbar.module.scss';
import buttons from '../../styles/button.module.scss'
import logo from '../../assets/zenlish.png';
import '../../styles/index.scss';
import { Link } from 'react-router-dom';  
import 'bootstrap-icons/font/bootstrap-icons.css';


const Navbar = () => {
    return (
        <nav className={styles.header_nav}>
            <div className={styles.header_main}>
                <img src={logo} alt="" className={styles.logo} />
                <ul className={styles.header_main_nav}>
                    <li>
                     <Link to="/about">Về chúng tôi <i className="bi bi-caret-down-fill"></i></Link>
                        <ul className={styles.dropdown_menu}>
                            <li><Link className="dropdown-item" to="/about/team">Đội ngũ</Link></li>
                            <li><Link className="dropdown-item" to="/about/history">Lịch sử</Link></li>
                        </ul>
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
