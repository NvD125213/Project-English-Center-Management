import QuestionController from "../controllers/question.js";
import express from 'express';

const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.post('/create', QuestionController.create)
router.post('/createWithGroups', QuestionController.createWithGroups)

router.get('/getByExamAndPart', QuestionController.getByExamAndPart)
router.put('/update', QuestionController.update)

export default router;
