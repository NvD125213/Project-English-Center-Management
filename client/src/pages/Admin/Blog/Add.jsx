import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import axios from 'axios'

const Add = ({ isModalOpen, handleOk, handleCancel, handleFormSubmit, onUpdateSuccess }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [menus, setMenu] = useState([])
    const [subMenus, setSubMenus] = useState([]);

    const handleImageChange = (file) => {
        setThumbnail(file);
    };
    useEffect(() => {
        const fetchSubMenus = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/menu/getAll"); // API lấy danh sách SubMenu
                setMenu(response.data)
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubMenus();
    }, []);
    const handleMenuChange = async (menuId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/menu/getById/${menuId}`); // API lấy subMenu theo menuId
            setSubMenus(response.data.subMenus);
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải danh sách subMenu!");
        }
    };
    const onFinish = async (values) => {

        try {
            const formDataImage = new FormData();
            formDataImage.append("image", thumbnail);

            // Upload ảnh đại diện lên server
            const imageResponse = await axios.post("http://localhost:5000/api/blogs/upload", formDataImage);
            const imageUrl = imageResponse.data.imageUrl;

            // Gắn URL ảnh vào form data
            const formData = { ...values, content, images: imageUrl };
            handleFormSubmit(formData);
            form.resetFields();
            onUpdateSuccess();
            setThumbnail(null);

            handleOk();
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải ảnh đại diện!");
        }
    };

    const handleImageUpload = async (blobInfo) => {
        const formData = new FormData();
        formData.append("image", blobInfo.blob());
        try {
            const response = await axios.post("http://localhost:5000/api/blogs/upload", formData);
            return response.data.imageUrl;
        } catch (err) {
            console.error(err);
            toast.error("Tải ảnh lên thất bại!");
        }
    };

    return (
        <Modal
            title="Thêm bài viết mới"
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
                    name="images"
                    label="Ảnh đại diện"
                    rules={[{ required: true, message: 'Vui lòng tải ảnh đại diện!' }]}
                >
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                </Form.Item>
                <Form.Item name="menu" label="Chọn menu" rules={[{ required: true, message: 'Vui lòng chọn menu!' }]}>
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
                <Form.Item name="subMenu" label="Chọn menu phụ" rules={[{ required: true, message: 'Vui lòng chọn menu phụ!' }]}>
                    <Select placeholder="Chọn subMenu">
                        {subMenus.map((submenu) => (
                            <Select.Option key={submenu._id} value={submenu._id}>
                                {submenu.name}
                            </Select.Option>
                        ))}
                    </Select>
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
                            images_upload_handler: handleImageUpload,
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm bài viết
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default Add;
