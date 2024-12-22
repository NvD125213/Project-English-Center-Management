import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle'
import { formatLink } from '../../helpers/formatLink';
import RecentBlogs from '../../components/RecentBlog';
import './styles.css'

const MenuDetail = () => {
    const location = useLocation();
    const { id, subMenu } = location.state || {};
    const [blogs, setBlogs] = useState([])
    const fetchListBlog = () => {
        axios.get(`http://localhost:5000/api/blogs/getBlogByMenu/${id}`)
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching menus:', error);
            });
    };
    // Gọi fetchMenus khi component mount
    useEffect(() => {
        fetchListBlog();
    }, [id]);

    const extractTextFromHTML = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        return doc.body.textContent || "";
    };

    const BlogContentSnippet = ({ content }) => {
        const text = extractTextFromHTML(content);
        const snippet = text.slice(0, 200);

        return (
            <div>
                <p>{snippet}...</p>
            </div>
        );
    };

    return (
        <section>
            <PageTitle title={subMenu} />

            <div className="container" style={{ paddingTop: 30, paddingBottom: 30 }}>
                <div className="row">
                    <div className="col-8">
                        {blogs.length > 0 ? blogs.map((blog, index) => (
                            <Link
                                to={`/${formatLink(blog.title)}`}
                                state={{ idBlog: blog._id, }}
                            >
                                <div key={index} className="blog-card">
                                    <img src={blog.images[0]} alt={blog.title} className="blog-image" />
                                    <div className="blog-content">
                                        <h3 className="blog-title">{blog.title}</h3>
                                        <BlogContentSnippet content={blog.content} />
                                    </div>
                                </div>
                            </Link>

                        )) : (
                            <div>
                                Không có bài viết nào
                            </div>
                        )}
                    </div>
                    <div className="col">
                        <RecentBlogs />  {/* Hiển thị component RecentBlogs bên phải */}
                    </div>
                </div>


            </div>
        </section>


    );
};

export default MenuDetail;
