import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Space, Typography, Row, Col } from 'antd';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // Dùng để lưu thông tin người dùng đang chỉnh sửa
    const [form] = Form.useForm(); // Form để quản lý thông tin trong modal

    // Lấy danh sách người dùng từ API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/getAll');
                setUsers(response.data);
            } catch (error) {
                notification.error({ message: 'Lấy dữ liệu người dùng thất bại!' });
            }
        };
        fetchUsers();
    }, []);

    // Mở modal để thêm người dùng
    const handleAddUser = () => {
        setEditingUser(null); // Khi thêm, không có người dùng nào được chỉnh sửa
        form.resetFields();
        setIsModalVisible(true);
    };

    // Mở modal để chỉnh sửa người dùng
    const handleEditUser = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Xử lý việc thêm hoặc cập nhật người dùng
    const handleSubmit = async (values) => {
        try {
            if (editingUser) {
                // Cập nhật người dùng
                await axios.put(`http://localhost:5000/api/user/update/${editingUser._id}`, values);
                notification.success({ message: 'Cập nhật người dùng thành công!' });
            } else {
                // Thêm người dùng mới
                await axios.post('http://localhost:5000/api/user/register', values);
                notification.success({ message: 'Thêm người dùng thành công!' });
            }
            // Sau khi thực hiện thành công, đóng modal và reload danh sách người dùng
            setIsModalVisible(false);
            const response = await axios.get('http://localhost:5000/api/user/getAll');
            setUsers(response.data);
        } catch (error) {
            notification.error({ message: 'Có lỗi xảy ra!' });
        }
    };

    // Xử lý việc xóa người dùng
    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`'http://localhost:5000/api/user/delete/${id}`);
            notification.success({ message: 'Xóa người dùng thành công!' });
            // Sau khi xóa, reload danh sách người dùng
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            notification.error({ message: 'Xóa người dùng thất bại!' });
        }
    };

    // Định nghĩa các cột trong bảng
    const columns = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Tên đăng nhập', dataIndex: 'log_Name', key: 'log_Name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Vai trò', dataIndex: 'role', key: 'role', render: (role) => (role === 1 ? 'Quản trị viên' : 'Người dùng') },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEditUser(record)} style={{ marginRight: 8 }}>
                        Sửa
                    </Button>
                    <Button onClick={() => handleDeleteUser(record._id)} danger>
                        Xóa
                    </Button>
                </>
            ),
        },
    ];

    return (

        <Space size="large" direction="vertical" className="container-fluid">
            <Row justify="space-between" align="middle" style={{ margin: 16 }}>
                <Col>
                    <Typography.Title level={4}>Quản lý Người dùng</Typography.Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={handleAddUser}
                    >
                        Thêm người dùng
                    </Button>
                </Col>
            </Row>


            <Table columns={columns} dataSource={users.data} rowKey="_id" />

            {/* Modal Thêm/Sửa người dùng */}
            <Modal
                title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={editingUser || { role: 2 }} // Vai trò mặc định là người dùng
                >
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true, message: 'Tên không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="log_Name"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: 'Tên đăng nhập không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Email không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: 'Vai trò không được để trống' }]}
                    >
                        <Select>
                            <Select.Option value={1}>Quản trị viên</Select.Option>
                            <Select.Option value={2}>Người dùng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingUser ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Space>

    );
};

export default UserManagement;
