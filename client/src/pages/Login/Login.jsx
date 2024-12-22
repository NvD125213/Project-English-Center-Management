import React, { useState, useEffect } from "react";
import './styles.css';
import useToggleContainer from '../../helpers/useToggleContainer.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from "../../store/userSlice.js";
import { updateFormData } from "../../store/userSlice.js";
import LoadingSpinner from "../../components/LoadingSpinner/index.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
  const { isActive, handleRegisterClick, handleLoginClick } = useToggleContainer();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { formData, isMessage, errors, isLoading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleLoginEvent = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      await dispatch(loginUser(userData)).unwrap();
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };
  const handleRegisterEvent = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      if (isMessage) {
        toast.success(isMessage);
      }
      // Reset formData về giá trị mặc định
      dispatch(updateFormData({ name: "", log_Name: "", phone: "", email: "", password: "" }));
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={`containers ${isActive ? "active" : ""}`} id="container">
        {/* Form Đăng Ký */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegisterEvent}>
            <h1>Đăng Ký</h1>
            <input type="text" name="name" placeholder="Tên" value={formData.name} onChange={handleChange} required />
            {errors?.name && <p className="error">{errors.name}</p>}
            <input type="text" name="log_Name" placeholder="Tên đăng nhập" value={formData.log_Name} onChange={handleChange} required />
            {errors?.log_Name && <p className="error">{errors.log_Name}</p>}
            <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} required />
            {errors?.phone && <p className="error">{errors.phone}</p>}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            {errors?.email && <p className="error">{errors.email}</p>}
            <div className="form-input-password position-relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i
                className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer" }}
                onClick={() => setShowPass(!showPass)}
              />
            </div>
            {errors?.password && <p className="error">{errors.password}</p>}
            <button type="submit">{isLoading ? <LoadingSpinner /> : "Đăng Ký"}</button>
            {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
          </form>
        </div>

        {/* Form Đăng Nhập */}
        <div className="form-container sign-in">
          <form onSubmit={handleLoginEvent}>
            <h1>Đăng Nhập</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-input-password position-relative">
              <input
                type={showPass ? "text" : "password"} // Hiển thị text nếu showPass = true
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
              <i
                className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowPass(!showPass)} // Thay đổi trạng thái hiển thị mật khẩu
              />
            </div>

            <a href="#">Quên mật khẩu?</a>
            <button type="submit">
              {isLoading ? <LoadingSpinner /> : "Đăng Nhập"}
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


