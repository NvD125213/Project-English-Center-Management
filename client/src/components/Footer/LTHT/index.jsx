import React from 'react';
import './styles.module.scss'; // Import SCSS thông thường

const LTHT = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: 'rgb(230, 245, 255)' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Cột ảnh */}
          <div className="col-md-6">
            <img
              src="https://zenlishtoeic.vn/wp-content/uploads/2024/08/zenlish-form.jpg"
              alt="zenlish"
              className="img-fluid"
            />
          </div>

          {/* Cột form */}
          <div className="col-md-6 text-white p-4">
            <form className="bg-img-footer shadow p-4 form-footer">
              {/* Input Tên và Số điện thoại */}
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control input-custom"
                    placeholder="Nhập tên của bạn!"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control input-custom"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              {/* Input khác */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control input-custom"
                  placeholder="Nhập email của bạn..."
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control input-custom"
                  placeholder="Nhập tên trường (nếu có)..."
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control input-custom"
                  placeholder="Bạn cần bằng TOEIC để làm gì?"
                />
              </div>
              <div className="mb-4">
                <select className="form-select form-control input-custom" aria-label="Default select example" style={{ background: 'transparent' }}>
                  <option selected>Lựa chọn trình độ hiện tại của bạn</option>
                  <option value={1}>0-295</option>
                  <option value={2}>295-450</option>
                  <option value={3}>450-650</option>
                </select>

              </div>
              <div className="mb-4">
                <select className="form-select form-control input-custom" aria-label="Default select example" style={{ background: 'transparent' }}>
                  <option selected>Lựa chọn mục tiêu của bạn</option>
                  <option value={1}>450 +</option>
                  <option value={2}>650 +</option>
                  <option value={3}>700 +</option>
                </select>

              </div>
              <div className="mb-4">
                <select className="form-select form-control input-custom" aria-label="Default select example" style={{ background: 'transparent' }}>
                  <option selected>Lộ trình học bạn quan tâm ?</option>
                  <option value={1}>FOUDATION (Xây nền)</option>
                  <option value={2}>BEGINNER (0-295 +)</option>
                  <option value={3}>CAMPBOMB (450 - 650 +)</option>
                  <option value={4}>SUBMARINE (700 +)</option>
                  <option value={5}>Nói và viết</option>

                </select>

              </div>

              {/* Nút đăng ký */}
              <button type="submit" className="btn btn-primary w-100">
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LTHT;
