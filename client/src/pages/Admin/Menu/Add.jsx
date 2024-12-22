import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form, Space } from 'antd';
import axios from 'axios';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const MenuForm = ({ visible, onCancel, onSubmit, menuId }) => {
    const [name, setName] = useState('');
    const [subMenus, setSubMenus] = useState([]); // Khởi tạo subMenus là mảng rỗng
    const [form] = Form.useForm();

    // Reset form khi chuyển sang chế độ thêm mới
    useEffect(() => {
        if (!menuId) {
            form.resetFields(); // Reset form khi không có menuId (chế độ thêm mới)
            setSubMenus([{ name: '', link: '' }]); // Khởi tạo lại subMenus
        } else {
            // Nếu có menuId, fetch dữ liệu của menu
            axios.get(`http://localhost:5000/api/menu/getById/${menuId}`)
                .then(response => {
                    const { name, subMenus } = response.data;
                    setName(name);
                    setSubMenus(subMenus || []); // Đảm bảo subMenus luôn là mảng
                    form.setFieldsValue({ name, subMenus });
                })
                .catch(error => {
                    console.error('Error fetching menu:', error);
                });
        }
    }, [menuId, form]);

    // Hàm để thêm SubMenu mới
    const addSubMenu = () => {
        setSubMenus([...subMenus, { name: '', link: '' }]);
    };

    // Hàm xóa SubMenu
    const deleteSubMenu = (index) => {
        const newSubMenus = subMenus.filter((_, i) => i !== index);
        setSubMenus(newSubMenus);
    };

    // Hàm submit form
    const handleSubmit = () => {
        const menuData = {
            name,
            subMenus: subMenus.map(sub => ({ name: sub.name, link: sub.link })),
        };

        if (menuId) {
            // Cập nhật Menu
            axios.put(`http://localhost:5000/api/menu/update/${menuId}`, menuData)
                .then(response => {
                    onSubmit(response.data);
                })
                .catch(error => {
                    console.error('Error updating menu:', error);
                });
        } else {
            // Tạo mới Menu
            axios.post('http://localhost:5000/api/menu/create', menuData)
                .then(response => {
                    onSubmit(response.data);
                })
                .catch(error => {
                    console.error('Error creating menu:', error);
                });
        }
    };

    return (
        <Modal
            visible={visible}
            title={menuId ? "Edit Menu" : "Add New Menu"}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {menuId ? "Sửa Menu" : "Tạo Menu"}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="menuForm">
                <Form.Item
                    label="Menu Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input menu name!' }]} >
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>

                <Form.Item label="SubMenus" name="subMenus">
                    {subMenus?.map((subMenu, index) => (
                        <Space key={index} style={{ marginBottom: 8 }} align="baseline">
                            <Input
                                placeholder="Tên menu phụ"
                                value={subMenu.name}
                                onChange={(e) => {
                                    const newSubMenus = [...subMenus];
                                    newSubMenus[index].name = e.target.value;
                                    setSubMenus(newSubMenus);
                                }}
                            />
                            <Input
                                placeholder="Chi tiết"
                                value={subMenu.link}
                                onChange={(e) => {
                                    const newSubMenus = [...subMenus];
                                    newSubMenus[index].link = e.target.value;
                                    setSubMenus(newSubMenus);
                                }}
                            />
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                onClick={() => deleteSubMenu(index)}
                            >
                                Xóa
                            </Button>
                        </Space>
                    ))}
                    <Button type="dashed" onClick={addSubMenu} block icon={<PlusOutlined />}>
                        Add SubMenu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MenuForm;
