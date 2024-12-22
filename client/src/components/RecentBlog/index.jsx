import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css'
import { formatLink } from '../../helpers/formatLink';

const RecentBlogs = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        // Fetch 5 bài viết gần đây nhất
        axios.get('http://localhost:5000/api/blogs/getRecentBlogs')
            .then(response => {
                setRecentBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching recent blogs:', error);
            });
    }, []);

    return (
        <div className="recent-blogs">
            <h3>Bài viết gần đây</h3>
            {recentBlogs.length > 0 ? (
                recentBlogs.map((blog, index) => (
                    <Link key={index} to={`/${formatLink(blog.title)}`} state={{ idBlog: blog._id }}>
                        <div className="recent-blog-card">
                            <img src={blog.images[0]} alt={blog.title} className="recent-blog-image" />
                            <div className="recent-blog-content">
                                <h4>{blog.title}</h4>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Không có bài viết gần đây</p>
            )}
        </div>
    );
};

export default RecentBlogs;
