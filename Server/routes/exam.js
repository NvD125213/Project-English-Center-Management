import ExamController from "../controllers/exam.js";
import express from 'express';

const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.post('/create', ExamController.create)
router.put('/update/:id', ExamController.update)
router.put('/delete/:id', ExamController.delete)
router.get('/getAll', ExamController.get)
router.get('/getByID/:id', ExamController.getByID)
router.delete('/delete/:id', ExamController.delete)


export default router;
