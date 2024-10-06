import React, { useState, useEffect } from "react";
import './styles.css';
import useToggleContainer from '../../helpers/useToggleContainer.js'; 
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../store/userSlice.js";
import LoadingSpinner from "../../components/LoadingSpinner/index.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isActive, handleRegisterClick, handleLoginClick } = useToggleContainer();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logName, setLogName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleLoginEvent = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    await dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (isAuthenticated) { // Điều hướng nếu đã xác thực
      navigate('/');
    }
  }, [isAuthenticated, navigate]); // Theo dõi isAuthenticated

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className={`containers ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Đăng Ký</h1>
            <input type="text" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Tên đăng nhập" value={logName} onChange={(e) => setLogName(e.target.value)} />
            <input type="text" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Đăng Ký</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLoginEvent}>
            <h1>Đăng Nhập</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href="#">Quên mật khẩu?</a>
            <button type="submit">
                {isLoading ? <LoadingSpinner/> : "Đăng Nhập"}
            </button>
            {error && (
              <div className="alert alert-danger mt-2" role="alert">{error}</div>
            )}
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>Đăng Nhập</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
              <button className="hidden" id="register" onClick={handleRegisterClick}>Đăng Ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
