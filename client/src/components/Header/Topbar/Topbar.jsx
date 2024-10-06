import React from 'react';
import '../../../styles/index.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/userSlice';

const Topbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user) || {};  

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="topbar bg-light py-2">
      <div className="container d-flex justify-content-around align-items-center mw-100">
        <div className="left-section">
          <a href="tel:123-456-7890" className="me-3 text-dark">
            <i className="bi bi-telephone-forward-fill mx-2"></i>
            <span>0968-456-7890</span>
          </a>
        </div>
        <div className="left-section">
          <span>Zenlish - Học TOEIC 1 Lần Là Đạt</span>
        </div>

        <div className="right-section d-flex">
          {isAuthenticated ? (
            <div>
              <span className="me-3 text-dark">Xin chào, {user?.name}!</span>
              <button onClick={handleLogout} className="me-3 text-dark" style={{border: '0px'}}>Đăng xuất</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="me-3 text-dark">Đăng nhập</Link>
              <Link to="/register" className="text-dark">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
