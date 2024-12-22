import express from 'express'
import multer from 'multer'
import BlogController from '../controllers/blog.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage })

router.get("/getAll", BlogController.getAllBlog)
router.get('/getRecentBlogs', BlogController.getRecentBlogs);
router.get('/getBlogByMenu/:id', BlogController.getBlogsBySubMenu);
router.get('/getBlogById/:id', BlogController.getBlogById)
router.post("/createBlog", BlogController.createBlog)
router.post("/upload", upload.single("image"), BlogController.uploadImage);
router.put("/updateBlog/:id", BlogController.updateBlog);
router.delete("/deleteBlog/:id", BlogController.deleteBlog);

export default router;