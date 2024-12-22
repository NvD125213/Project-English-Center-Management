import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecentBlogs from '../../components/RecentBlog'
import axios from 'axios';

const BlogDetail = () => {
    const location = useLocation();
    const { idBlog } = location.state || {};

    const [blog, setBlog] = useState(null);  // Lưu trữ dữ liệu blog
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy chi tiết bài viết từ API
    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/getBlogById/${idBlog}`);
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                setError('Không thể lấy dữ liệu bài viết');
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [idBlog]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    };
    return (
        <div className="container" style={{ paddingTop: 30, paddingBottom: 30 }}>
            <div className="row">
                <div className="col-9">
                    {blog && (
                        <div className="blog-detail">
                            <h1 style={{ textAlign: 'left' }}>{blog.title}</h1>
                            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                            <div className="blog-footer">
                                <p><strong>Ngày viết:</strong> {formatDate(blog.createdAt)}</p>
                                <p><strong>Người viết:</strong> {blog.author || 'Lan Hạ'}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col">
                    <RecentBlogs />  {/* Hiển thị component RecentBlogs bên phải */}
                </div>

            </div>
        </div>


    );
};

export default BlogDetail;
