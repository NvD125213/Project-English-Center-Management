import {
  AppstoreOutlined,
  MenuOutlined,
  HighlightOutlined ,
  UserOutlined,
  WindowsOutlined,
  CalculatorOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/admin");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin", 
          },
          {
            label: "Quản Lý Danh Mục",
            key: "/admin/menu", 
            icon: <MenuOutlined />,
          },
          {
            label: "Quản Lý Bài Viết",
            key: "/admin/post", 
            icon: <HighlightOutlined />,
          },
          {
            label: "Quản Lý Người Dùng",
            key: "/admin/user", 
            icon: <UserOutlined />,
          },
          {
            label: "Quản Lý Chủ Đề",
            key: "/admin/subject", 
            icon: <WindowsOutlined />,
          },
          {
            label: "Quản Lý Bài Thi",
            key: "/admin/exam", 
            icon: <CalculatorOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
