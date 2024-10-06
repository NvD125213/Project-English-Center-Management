import SubjectController from "../controllers/subject.js";
import express from 'express';

const router = express.Router();

// Định tuyến cho đăng ký người dùng
router.post('/create', SubjectController.create)
router.get('/getAll', SubjectController.get);
router.put('/update/:id', SubjectController.update);
router.delete('/delete/:id', SubjectController.delete);
router.get('/getByID/:id', SubjectController.getByID);

export default router;
