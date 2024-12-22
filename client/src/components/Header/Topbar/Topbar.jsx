import React, { useEffect } from 'react';
import '../../../styles/index.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover, Button } from 'antd';
import { logoutUser } from '../../../store/userSlice';
import { getUserProfile } from '../../../store/userSlice';

const Topbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user) || {};
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  const userPopoverContent = (
    <div>
      <p>
        <Link to="/profile-user">Thông tin cá nhân</Link>
      </p>
      <p>
        <Link
          to="/history-management"
          state={{ userId: user?._id || "" }}
        >Lịch sử thi</Link>
      </p>
      <Button type="link" onClick={handleLogout} style={{ padding: 0 }}>
        Đăng xuất
      </Button>
    </div>
  );

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
              <Popover content={userPopoverContent} trigger="click">
                <Button type="text" className="me-3">
                  {user?.log_Name}
                </Button>
              </Popover>
              <button onClick={handleLogout} className="me-3" style={{ border: '0px' }}>Đăng xuất</button>
            </div>
          ) : (
            <>
              <Link to="/auth" className="me-3 text-dark">Đăng nhập</Link>
              <Link to="/auth" className="text-dark">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
