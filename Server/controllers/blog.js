import Blog from "../models/blog.js";

const BlogController = {
    getAllBlog: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.status(200).json(blogs);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch blogs" });
        }
    },
    createBlog: async (req, res) => {
        const { title, content, images, subMenu } = req.body;
        try {
            const newBlog = await Blog.create({
                title,
                content,
                images,
                subMenu,
            });

            res.status(201).json({
                message: 'Tạo bài viết thành công!',
                newBlog,
            });
        } catch (err) {
            res.status(500).json({ error: "Failed to create blog" });
        }
    },
    uploadImage: async (req, res) => {
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    },
    updateBlog: async (req, res) => {
        const { id } = req.params;
        const { title, content, images, subMenu } = req.body;
        try {
            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({ error: "Blog không tồn tại" });
            }

            if (title) blog.title = title;
            if (content) blog.content = content;
            if (images) blog.images = images;
            if (subMenu) blog.subMenu = subMenu;

            await blog.save();

            res.status(200).json({ message: "Cập nhật bài viết thành công!", blog });
        } catch (err) {
            res.status(500).json({ error: "Failed to update blog" });
        }
    },
    deleteBlog: async (req, res) => {
        const { id } = req.params;
        try {
            const blog = await Blog.findByIdAndDelete(id);
            if (!blog) {
                return res.status(404).json({ error: "Blog không tồn tại" });
            }

            res.status(200).json({ message: "Xóa bài viết thành công!" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete blog" });
        }
    },
    getBlogsBySubMenu: async (req, res) => {
        const { id } = req.params;
        try {
            const blogs = await Blog.find({ subMenu: id }).populate('subMenu');
            res.status(200).json(blogs);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch blogs by submenu" });
        }
    },
    getBlogById: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({ message: 'Bài viết không tồn tại' });
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getRecentBlogs: async (req, res) => {
        try {
            const recentBlogs = await Blog.find()
                .sort({ createdAt: -1 })  // Sắp xếp theo ngày tạo (mới nhất trước)
                .limit(5);  // Lấy tối đa 5 bài viết
            res.status(200).json(recentBlogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


}

export default BlogController