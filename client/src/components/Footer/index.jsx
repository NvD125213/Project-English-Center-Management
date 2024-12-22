import React from 'react';
import LTHT from './LTHT';
import CHTG from './CHTG';

const Footer = () => {
    return (
        <div className="footer" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <LTHT />
            <CHTG />
            {/* Footer */}
            <div style={{ backgroundColor: '#0037f4', color: 'white' }}>
                <div className="container">
                    <footer className="text-center text-lg-start">
                        {/* Section: Social media */}
                        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                            {/* Left */}
                            <div className="me-5 d-none d-lg-block">
                                <span>Kết nối với chúng tôi trên:</span>
                            </div>
                            {/* Right */}
                            <div>
                                <a href="https://facebook.com" className="me-4 text-reset">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://twitter.com" className="me-4 text-reset">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="https://google.com" className="me-4 text-reset">
                                    <i className="bi bi-google"></i>
                                </a>
                                <a href="https://instagram.com" className="me-4 text-reset">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </section>
                        {/* Section: Links */}
                        <section>
                            <div className="container text-center text-md-start mt-5">
                                <div className="row mt-3">
                                    {/* Company Info */}
                                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                        <h6 className="text-uppercase fw-bold mb-4">
                                            <i className="fas fa-gem me-3" />
                                            TRUNG TÂM ANH NGỮ ZENLISH
                                        </h6>
                                        <p>Cơ sở 1 - Kim Mã: Số 22A ngách 25, ngõ 629 Kim Mã, phường Ngọc Khánh, Ba Đình, Hà Nội</p>
                                        <p>Cơ sở 2 - Hai Bà Trưng: Số 5, ngõ 128 phố Vọng, Hai Bà Trưng, Hà Nội</p>
                                        <p>Cơ sở 3 - Hà Đông: Số 56, ngõ 54 Nguyễn Khuyến, Văn Quán, Hà Đông</p>
                                        <p>Cơ sở 4 - Nam Từ Liêm: 44 Nguyễn Hoàng, Nam Từ Liêm, Hà Nội</p>
                                    </div>
                                    {/* Contact Info */}
                                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                        <h6 className="text-uppercase fw-bold mb-4">
                                            CÔNG TY TNHH TƯ VẤN GIÁO DỤC VÀ XÚC TIẾN THƯƠNG MẠI ZENLISH
                                        </h6>
                                        <p>
                                            <a href="tel:0377602075" className="text-reset">
                                                <i className="bi bi-telephone-fill m-2"></i>
                                                0377 602 075
                                            </a>
                                        </p>
                                        <p>
                                            <a href="mailto:infor@zenlish.edu.vn" className="text-reset">
                                                <i className="bi bi-envelope m-2"></i>
                                                infor@zenlish.edu.vn
                                            </a>
                                        </p>
                                        <h4>THỜI GIAN LÀM VIỆC</h4>
                                        <ul style={{ display: 'block', padding: '0' }}>
                                            <li>Sáng: 08:00 - 12:00<p>(Thứ Hai - thứ Bảy)</p></li>
                                            <li>Chiều: 13:30 - 17:30<p>(Thứ Hai - Thứ Bảy)</p></li>
                                            <li>Tối: 18:00 - 21:45<p>(Thứ Hai - Thứ Bảy)</p></li>
                                        </ul>
                                    </div>
                                    {/* Help Center */}
                                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                        <h6 className="text-uppercase fw-bold mb-4">Trung tâm trợ giúp</h6>
                                        <p><a href="#!" className="text-reset">Điều khoản</a></p>
                                        <p><a href="#!" className="text-reset">Cài đặt</a></p>
                                        <p><a href="#!" className="text-reset">Mua hàng</a></p>
                                        <p><a href="#!" className="text-reset">Liên hệ trợ giúp</a></p>
                                    </div>
                                    {/* Additional Contact */}
                                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                        <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                                        <p><i className="fas fa-home me-3" /> Hà Nội, NY 10012, VN</p>
                                        <p><i className="fas fa-envelope me-3" /> info@example.com</p>
                                        <p><i className="fas fa-phone me-3" /> + 01 234 567 88</p>
                                        <p><i className="fas fa-print me-3" /> + 01 234 567 89</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Copyright */}
                        <div className="text-center p-4">
                            © 2021 Copyright:
                            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Zenlish.com</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Footer;
