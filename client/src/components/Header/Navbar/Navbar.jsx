import React, { useState, useEffect } from "react";
import styles from '../Navbar/Navbar.module.scss';
import axios from "axios";
import buttons from '../../../styles/button.module.scss'
import logo from '../../../assets/zenlish.png';
import { formatLink } from "../../../helpers/formatLink";
import '../../../styles/index.scss';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux";


const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [menus, setMenus] = useState([]);
    const fetchMenus = () => {
        axios.get('http://localhost:5000/api/menu/getAll')
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('Error fetching menus:', error);
            });
    };


    // Gọi fetchMenus khi component mount
    useEffect(() => {
        fetchMenus();
    }, []);
    const handleTestOnlineClick = () => {
        if (isAuthenticated) {
            navigate('/test-online'); // Điều hướng đến trang test online
        } else {
            alert("Vui lòng đăng nhập để sử dụng chức năng này!");
            navigate('/auth'); // Điều hướng đến trang đăng nhập
        }
    };

    return (
        <nav className={styles.header_nav}>
            <div className={styles.header_main}>
                {/* <button 
                    className="btn btn-primary" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasRight" 
                    aria-controls="offcanvasRight"
                >
                    <i className="bi bi-list"></i>
                </button> */}
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
                    {
                        menus && menus.length > 0 && menus.map((menu, index) => (
                            <li key={menu._id}>
                                <Link to="/">
                                    {menu.name}
                                    {menu.subMenus.length > 0 && <i className="bi bi-caret-down-fill"></i>}
                                </Link>
                                {menu.subMenus.length > 0 && (
                                    <div className={styles.sub_menu}>
                                        {
                                            menu.subMenus.map((sub, index) => (
                                                <Link
                                                    key={sub._id}
                                                    to={`/${formatLink(menu.name)}/${formatLink(sub.link)}`}
                                                    state={{ id: sub._id, subMenu: sub.name }}
                                                >
                                                    <i className="bi bi-caret-right-fill"></i>
                                                    <p>{sub.name}</p>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                )}
                            </li>
                        ))
                    }
                </ul>

                <ul className={styles.button_nav}>
                    <li><div className={`${buttons.btn} ${styles.button_search}`} ><i className="bi bi-search"></i></div></li>
                    <li>
                        <div
                            className={`${buttons.btn} ${styles.button_test}`}
                            onClick={handleTestOnlineClick}
                        >
                            Test online
                        </div>
                    </li>
                </ul>

            </div>

        </nav>
    );
}

export default Navbar;
