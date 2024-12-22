import { verifyToken } from "../controllers/middleware.js";
import UserController from "../controllers/user.js";
import express from 'express';
import User from "../models/user.js";
const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getAll', UserController.get);
// router.get('/getByID/:id', UserController.getByID);
router.put('/update/:id', UserController.update)
router.delete('/delete/:id', UserController.delete)
router.get('/profile', verifyToken, UserController.getByID)
router.get('/daily-signups', async (req, res) => {
    try {
        // Lấy thời gian bắt đầu và kết thúc của ngày hôm nay
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Lấy thời gian bắt đầu và kết thúc của ngày hôm qua
        const startOfYesterday = new Date();
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);
        startOfYesterday.setHours(0, 0, 0, 0);

        const endOfYesterday = new Date();
        endOfYesterday.setDate(endOfYesterday.getDate() - 1);
        endOfYesterday.setHours(23, 59, 59, 999);

        // Truy vấn số người đăng ký hôm nay
        const todaySignups = await User.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
        });

        // Truy vấn số người đăng ký hôm qua
        const yesterdaySignups = await User.countDocuments({
            createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
        });

        res.status(200).json({ todaySignups, yesterdaySignups });
    } catch (error) {
        console.error('Error fetching daily signups:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi thống kê số người đăng ký mới.' });
    }
});
router.get('/total', async (req, res) => {
    try {
        // Truy vấn tổng số người dùng
        const totalUsers = await User.countDocuments();

        // Trả về tổng số người dùng
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tính tổng số người dùng.' });
    }
});
export default router;
