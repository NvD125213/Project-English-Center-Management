import React, { useState } from 'react';
import { Space, Table, Typography, Button, Row, Col, Modal } from 'antd';
import Add from './Add';
import Update from './Update';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Blog() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]); // Dữ liệu bài viết
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    // Lấy danh sách bài viết
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/blogs/getAll");
            setData(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải danh sách bài viết!");
        }
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleDelete = (record) => {
        console.log(record)
        Modal.confirm({
            title: 'Xóa bài viết',
            content: `Bạn có chắc chắn muốn xóa bài viết "${record.title}" không?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    const response = await axios.delete(`http://localhost:5000/api/blogs/deleteBlog/${record._id}`);
                    toast.success(response.data.message);
                    fetchBlogs();
                } catch (err) {
                    console.error(err);
                    toast.error("Xóa bài viết thất bại!");
                }
            },
        });
    };

    React.useEffect(() => {
        fetchBlogs();
    }, []);

    const handleFormSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:5000/api/blogs/createBlog", values)
            if (response) {
                toast.success(response.data.message)
            }
        } catch (err) {

        }
    }

    // Sửa bài viết
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const handleEditClick = (record) => {
        setEditingBlog(record); // Lưu thông tin bài viết cần sửa
        setIsEditModalOpen(true);
    };


    return (
        <Space size="large" direction="vertical" className="container-fluid">
            <ToastContainer />

            <Row justify="space-between" align="middle">
                <Col>
                    <Typography.Title level={4}>Quản lý bài viết</Typography.Title>
                </Col>
                <Col>
                    <Button type="primary" onClick={handleAddClick}>
                        Thêm bài viết
                    </Button>
                </Col>
            </Row>

            <Table
                dataSource={data.map((item, index) => ({ ...item, index: index + 1 }))}
                columns={[
                    {
                        title: 'STT',
                        dataIndex: 'index',
                    },
                    {
                        title: 'Tên bài viết',
                        dataIndex: 'title',
                    },
                    {
                        title: 'Ảnh đại diện',
                        dataIndex: 'images',
                        render: (images) => (
                            <img
                                src={images?.[0] || 'https://via.placeholder.com/150'}
                                alt="Ảnh đại diện"
                                style={{ width: 100, height: 60, objectFit: 'cover' }}
                            />
                        ),
                    },
                    {
                        title: 'Hành động',
                        render: (text, record) => (
                            <Space size="middle">
                                <Button type="primary" onClick={() => handleEditClick(record)}>Sửa</Button>
                                <Button danger onClick={() => handleDelete(record)}>
                                    Xóa
                                </Button>
                            </Space>
                        ),
                    },
                ]}
                pagination={{
                    style: { marginTop: '10px' },
                    pageSize: pagination.pageSize,
                    current: pagination.current,
                    onChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize });
                    },
                }}
            />

            <Add
                isModalOpen={isModalOpen}
                handleOk={() => {
                    setIsModalOpen(false);
                    fetchBlogs();
                }}
                handleCancel={() => setIsModalOpen(false)}
                handleFormSubmit={handleFormSubmit}
                onUpdateSuccess={fetchBlogs}

            />
            <Update
                isModalOpen={isEditModalOpen}
                handleOk={() => setIsEditModalOpen(false)}
                handleCancel={() => setIsEditModalOpen(false)}
                blogData={editingBlog}
                onUpdateSuccess={fetchBlogs}
            />

        </Space>
    );
}

export default Blog;
