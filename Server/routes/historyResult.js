import express from 'express';
import HistoryResultController from '../controllers/historyResult.js';
import HistoryResult from '../models/historyResult.js';
const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.get('/getMonthlyExamCount', HistoryResultController.getMonthlyExamCount)
router.get('/historyResult', HistoryResultController.getHistoryById)
router.get('/getHistoryByUser', HistoryResultController.getHistoryByUser)
router.get('/getExamCompletionCountById', HistoryResultController.getExamCompletionCountById)
router.get('/statistics', async (req, res) => {
    try {
        // Lấy thời gian bắt đầu và kết thúc của ngày hôm nay
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Tính tổng số lượt làm bài (tất cả dữ liệu trong HistoryResult)
        const totalAttempts = await HistoryResult.countDocuments();

        // Tính tổng số lượt làm bài trong ngày hôm nay
        const dailyAttempts = await HistoryResult.countDocuments({
            submittedAt: { $gte: startOfDay, $lte: endOfDay },
        });

        // Trả về tổng số lượt làm bài và tổng số lượt làm bài trong ngày
        res.status(200).json({ totalAttempts, dailyAttempts });
    } catch (error) {
        console.error('Error fetching exam statistics:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi thống kê số lượt làm bài.' });
    }
});
export default router;
