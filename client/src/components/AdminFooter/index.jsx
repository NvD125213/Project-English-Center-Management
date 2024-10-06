import { Typography } from "antd";
import './AdminFooter.css'; // File CSS chứa style mới

function AdminFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789" className="footer-link">
        0123456789
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank" className="footer-link">
        Điều khoản
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank" className="footer-link">
        Liên hệ với chúng tôi
      </Typography.Link>
    </div>
  );
}

export default AdminFooter;
