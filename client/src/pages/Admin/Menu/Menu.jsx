import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Row, Col, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import MenuForm from './Add';
import { ToastContainer } from 'react-toastify';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMenuId, setEditingMenuId] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

    // Lấy danh sách Menu khi component load
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
    // Xóa Menu
    const handleDeleteMenu = (id) => {
        axios.delete(`http://localhost:5000/api/menu/delete/${id}`)
            .then(() => {
                setMenus(menus.filter(menu => menu._id !== id));
                message.success('Menu deleted successfully');
                fetchMenus();
            })
            .catch(error => {
                console.error('Error deleting menu:', error);
                message.error('Failed to delete menu');
            });
    };

    // Cập nhật hoặc tạo mới Menu
    const handleEditMenu = (menuId) => {
        setEditingMenuId(menuId);
        setIsModalVisible(true);
    };

    const handleAddNewMenu = () => {
        setEditingMenuId(null);
        setIsModalVisible(true);
    };

    const handleSubmitMenu = (newMenu) => {
        if (editingMenuId) {
            setMenus(menus.map(menu => (menu._id === newMenu._id ? newMenu : menu)));
        } else {
            setMenus([...menus, newMenu]);
        }
        fetchMenus();
        setIsModalVisible(false);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Tên Menu',
            dataIndex: 'name',
        },
        {
            title: 'Danh sách Submenus',
            dataIndex: 'subMenus',
            render: (subMenus) => (
                <div>
                    {subMenus?.map(subMenu => (
                        <div key={subMenu.name}>{subMenu.name} / {subMenu.link}</div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Hành động',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditMenu(record._id)}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteMenu(record._id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Space size="large" direction="vertical" className="container-fluid">
            <ToastContainer />

            <Row justify="space-between" align="middle">
                <Col>
                    <Typography.Title level={4}>Quản lý Menu</Typography.Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddNewMenu}
                    >
                        Thêm Menu
                    </Button>
                </Col>
            </Row>

            <Table
                dataSource={menus?.map((item, index) => ({ ...item, index: index + 1 }))}
                columns={columns}
                pagination={{
                    style: { marginTop: '10px' },
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    onChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize });
                    },
                }}
            />

            <MenuForm
                visible={isModalVisible}
                menuId={editingMenuId}
                onCancel={handleCancelModal}
                onSubmit={handleSubmitMenu}
            />
        </Space>
    );
};

export default MenuList;
