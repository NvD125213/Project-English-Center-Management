import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Update = ({ isModalOpen, handleOk, handleCancel, blogData, onUpdateSuccess }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [menus, setMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            if (blogData) {
                form.setFieldsValue({
                    title: blogData.title,
                    menu: blogData.menu?._id,
                    subMenu: blogData.subMenu,
                });
                setContent(blogData.content || '');
                if (blogData.subMenu) {
                    const menuData = await fetchMenuBySubMenuId(blogData.subMenu);
                    if (menuData) {
                        form.setFieldsValue({ menu: menuData._id });
                        const subMenusResponse = await axios.get(`http://localhost:5000/api/menu/getById/${menuData._id}`);
                        setSubMenus(subMenusResponse.data.subMenus || []);
                    }
                }
            }
        };
        fetchMenuData();
    }, [blogData]);

    const fetchMenuBySubMenuId = async (subMenuId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/menu/findMenuBySubMenuId/${subMenuId}`);
            return response.data; // Giả sử API trả về dữ liệu menu
        } catch (error) {
            console.error("Không thể lấy thông tin menu!", error);
            toast.error("Không thể lấy thông tin menu!");
            return null;
        }
    };


    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/menu/getAll");
                setMenus(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMenus();
    }, []);

    const handleImageChange = (file) => {
        setThumbnail(file);
    };

    const handleMenuChange = async (menuId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/menu/getById/${menuId}`);
            setSubMenus(response.data.subMenus);
            form.setFieldsValue({ subMenu: null }); // Reset giá trị subMenu khi đổi menu
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải danh sách subMenu!");
        }
    };

    const onFinish = async (values) => {
        try {
            let imageUrl = blogData?.images?.[0]; // Giữ nguyên ảnh nếu không đổi

            if (thumbnail) {
                const formDataImage = new FormData();
                formDataImage.append("image", thumbnail);

                const imageResponse = await axios.post("http://localhost:5000/api/blogs/upload", formDataImage);
                imageUrl = imageResponse.data.imageUrl;
            }

            const updatedBlog = {
                ...values,
                content,
                images: [imageUrl]
            };

            await axios.put(`http://localhost:5000/api/blogs/updateBlog/${blogData._id}`, updatedBlog);
            toast.success("Cập nhật bài viết thành công!");
            onUpdateSuccess();
            handleOk();
        } catch (err) {
            console.error(err);
            toast.error("Cập nhật bài viết thất bại!");
        }
    };

    return (
        <Modal
            title="Cập nhật bài viết"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Tiêu đề bài viết"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết!' }]}
                >
                    <Input placeholder="Nhập tiêu đề bài viết" />
                </Form.Item>
                <Form.Item
                    name="menu"
                    label="Chọn menu"
                    rules={[{ required: true, message: 'Vui lòng chọn menu!' }]}
                >
                    <Select
                        placeholder="Chọn menu"
                        onChange={handleMenuChange}
                    >
                        {menus.map((menu) => (
                            <Select.Option key={menu._id} value={menu._id}>
                                {menu.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="subMenu"
                    label="Chọn menu phụ"
                    rules={[{ required: true, message: 'Vui lòng chọn menu phụ!' }]}
                >
                    <Select placeholder="Chọn subMenu">
                        {subMenus.map((submenu) => (
                            <Select.Option key={submenu._id} value={submenu._id}>
                                {submenu.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Ảnh đại diện">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                    {blogData?.images?.[0] && (
                        <div>
                            <p style={{ marginTop: '10px' }}>
                                Ảnh hiện tại:
                            </p>
                            <img src={blogData?.images?.[0]} style={{ width: '100px', height: '100px' }} alt="Current thumbnail" />
                        </div>
                    )}
                </Form.Item>
                <Form.Item label="Nội dung bài viết">
                    <Editor
                        apiKey="7egapj3kth9ezjnhtrhcpaw1mmmevqwrbd6w0l7tacrzwwar"
                        value={content}
                        onEditorChange={(newValue) => setContent(newValue)}
                        init={{
                            height: 500,
                            plugins: "image link code",
                            toolbar: "undo redo | bold italic | alignleft aligncenter alignright | image link",
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật bài viết
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Update;
